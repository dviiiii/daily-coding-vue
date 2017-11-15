

<template>
    <div>
        <div class="fn-left clearfix">
            <div class="fn-reading">
                <Card class="reading clearfix">
                    <p slot="title">
                        <Icon type="ios-book"></Icon>
                        今日已读
                    </p>
                    <Select v-model="readingData.bookName">
                        <Option v-for="item in bookInfo" :value="item.bookName" :key="item.bookName">{{ item.bookName }}</Option>
                    </Select>
                    <Input class="reading-input" v-model="readingData.bookPageNumberS" placeholder="起始页"></Input>
                    <Input class="reading-input" v-model="readingData.bookPageNumberE" placeholder="结束页"></Input>
                    <Button type="primary" @click="addRead">确认</Button>
                </Card>
            </div>
            <div class="fn-addBook">
                <Card class="reading clearfix">
                    <p slot="title">
                        <Icon type="android-add-circle"></Icon>
                        新增书籍
                    </p>
                    <Input v-model="addBookData.bookName" placeholder="输入书籍名称"></Input>
                    <Input v-model="addBookData.bookPageNumber" placeholder="输入书籍页码"></Input>
                    <Button type="primary" @click="addBook">确认</Button>
                </Card>
            </div>
            <div class="fn-books-table">
                <Card class="books-table clearfix">
                    <p slot="title">
                        <Icon type="flag"></Icon>
                        读书进度
                    </p>
                    <Table :columns="booksColumns" :data="bookInfo"></Table>
                </Card>
            </div>
        </div>
            <div class="fn-right">
                <Card class="review-table clearfix">
                    <p slot="title">
                        <Icon type="bookmark"></Icon>
                        今日待复习
                    </p>
                    <Table :columns="reviewColumns" :data="reviewInfo"></Table>
                </Card>
            </div>


    </div>
</template>

<script>
    import axios from  'axios';
    export default {
        name: 'books',
        data () {
            return {
                addBookData: {
                    bookName: '',
                    bookPageNumber: ''
                },
                bookInfo: [],
                readingData: {
                    bookName: '',
                    bookPageNumberS: '',
                    bookPageNumberE: ''
                },
                reviewInfo: [],
                reviewColumns: [
                    {
                        title: '书名',
                        key: 'bookName'
                    },
                    {
                        title: '页码',
                        render: (h, params) => {
                            return params.row.bookPageNumberS + '-' + params.row.bookPageNumberE;
                        }
                    },
                    {
                        title: '操作',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.checkReview(params.index);
                                        }
                                    }
                                }, '已复习')
                            ]);
                        }
                    }
                ],
                booksColumns: [
                    {
                        title: '书名',
                        key: 'bookName'
                    },
                    {
                        title: '进度',
                        render: (h, params) => {
                            return h('div', [
                                h('Progress', {
                                    props: {
                                        status: 'active',
                                        percent: parseInt(params.row.progress)
                                    }
                                })
                            ])
                        }
                    },
                    {
                        title: '操作',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteBook(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ]
            }
        },
        mounted () {
            this.queryBookInfo();
            this.queryReviewInfo();
        },
        methods: {
            //增加书籍
            addBook () {
                const vm = this;
                const parmas = {
                    bookName: vm.addBookData.bookName,
                    bookPageNumber: vm.addBookData.bookPageNumber
                };
                if(!parmas.bookName) {
                    vm.$Message.warning('书名不能为空！');
                    return false;
                }
                if(!parmas.bookPageNumber) {
                    vm.$Message.warning('页数不能为空！');
                    return false;
                }
                if(!/^[1-9]\d*$/g.test(parmas.bookPageNumber)) {
                    vm.$Message.warning('页数只能为正整数！');
                    return false;
                }
                axios.post('http://localhost:3000/book/addBook',parmas)
                    .then(function (response) {
                        if(response.data.state === 1) {
                            vm.$Message.success('新增成功！');
                        }else if(response.data.state === 0) {
                            vm.$Message.error('新增失败！');
                        }else if(response.data.state === 2) {
                            vm.$Message.warning('不得增加重复书籍！');
                        }else {
                            console.log(response)
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        vm.$Message.error('服务器错误！');
                    });
            },
            //增加今日所读
            addRead () {
                const vm = this;
                let parmas = {
                    bookName: vm.readingData.bookName,
                    bookPageNumberS: vm.readingData.bookPageNumberS,
                    bookPageNumberE: vm.readingData.bookPageNumberE
                };
                if(!parmas.bookName) {
                    vm.$Message.warning('书名不能为空！');
                    return false;
                }
                if(!parmas.bookPageNumberS || !parmas.bookPageNumberE) {
                    vm.$Message.warning('页数不能为空！');
                    return false;
                }
                if(!/^[1-9]\d*$/g.test(parmas.bookPageNumberS) || !/^[1-9]\d*$/g.test(parmas.bookPageNumberE)) {
                    vm.$Message.warning('页数只能为正整数！');
                    return false;
                }

                let bookPageNumber;

                for(let i in vm.bookInfo) {
                    if(vm.bookInfo[i].bookName === parmas.bookName  ) {
                        parmas.bookPageNumber = vm.bookInfo[i].bookPageNumber;

                        if((parseInt(parmas.bookPageNumberE) > parseInt(vm.bookInfo[i].bookPageNumber) || parseInt(parmas.bookPageNumberS) > parseInt(vm.bookInfo[i].bookPageNumber))) {
                            vm.$Message.warning(`页数最大为${vm.bookInfo[i].bookPageNumber}！`);
                            return false;
                        }
                    }
                }

                axios.post('http://localhost:3000/book/addReading',parmas)
                    .then(function (res) {
                        if(res.data.state === 1) {
                            vm.$Message.success('新增成功！');
                        }else if(res.data.state === 0) {
                            vm.$Message.error('新增失败！');
                        }else {
                            console.log(res)
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        vm.$Message.error('服务器错误！');
                    });
            },
            //查询书籍信息
            queryBookInfo () {
                const vm = this;
                axios.get('http://localhost:3000/book/queryBookInfo')
                    .then(function (res) {
                        if(res.data.state === 0) {
                            vm.$Message.error('获取书籍信息失败！');
                        }else {
                            vm.bookInfo = res.data;
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                        vm.$Message.error('服务器错误！');
                    })
            },
            //查询复习信息
            queryReviewInfo () {
                const vm = this;
                axios.get('http://localhost:3000/book/queryReviewInfo')
                    .then(function (res) {
                        if(res.data.state === 0) {
                            vm.$Message.error('获取复习信息失败！');
                        }else {
                            vm.reviewInfo = res.data;
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                        vm.$Message.error('获取复习信息失败！');
                    });
            },
            //已复习
            checkReview (index) {
                const vm = this;
                const params = vm.reviewInfo[index];
                axios.post('http://localhost:3000/book/checkReview', params)
                    .then(function (res) {
                        if(res.data.state === 0) {
                            vm.$Message.error('更新复习信息失败！');
                        }else {
                            vm.$Message.success('更新复习信息成功！');
                            vm.queryReviewInfo();
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                        vm.$Message.error('更新复习信息失败！');
                    })
            },
            deleteBook (index) {
                const vm = this;
                const params = vm.bookInfo[index]
                axios.post('http://localhost:3000/book/deleteBook', params)
                    .then(function (res) {
                        if(res.data.state === 0) {
                            vm.$Message.error('删除书籍失败！');
                        }else {
                            vm.$Message.success('删除书籍成功！');
                            vm.queryBookInfo();
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                        vm.$Message.error('删除书籍失败！');
                    });
            }
        }
    };
</script>

<style lang="less" scoped="">
    .fn-left {
        width: 66%;
        float: left;
    }

    .fn-left .fn-addBook,
    .fn-left .fn-reading{
        width: 49%;
        float: left;
    }

    .fn-left .fn-books-table {
        width: 98%;
        float: left;
    }

    .fn-right {
        width: 33%;
        float: right;
    }

    .reading, .review-table {
        width: 90%;
        margin: auto;
    }

    .reading-table .ivu-table-wrapper {
        min-height: 140px;
    }

    .reading .ivu-input-type,
    .reading .ivu-select-single {
        margin-top: 15px;
    }

    .reading button {
        margin: 15px 0;
        float: right;
    }

    .reading-input {
        width: 49%;
    }

    .books-table {
        width: 95%;
        margin: 30px auto;
    }


</style>
