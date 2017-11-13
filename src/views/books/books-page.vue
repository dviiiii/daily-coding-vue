

<template>
    <div>
        <Row>
            <Col span="8">
                <Card class="reading clearfix">
                    <p slot="title">
                        <Icon type="android-add-circle"></Icon>
                        新增书籍
                    </p>
                    <Input v-model="addBookData.bookName" placeholder="输入书籍名称"></Input>
                    <Input v-model="addBookData.bookPageNumber" placeholder="输入书籍页码"></Input>
                    <Button type="primary" @click="addBook">确认</Button>
                </Card>
            </Col>
            <Col span="8">
                <Card class="reading clearfix">
                    <p slot="title">
                        <Icon type="ios-book"></Icon>
                        今日已读
                    </p>
                    <Select v-model="todayBookName">
                        <Option v-for="item in books" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Input v-model="bookPageNumber" placeholder="输入书籍页码,用逗号分离"></Input>
                    <Button type="primary">确认</Button>
                </Card>
            </Col>
            <Col span="8">
                <Card class="review-table clearfix">
                    <p slot="title">
                        <Icon type="bookmark"></Icon>
                        今日待复习
                    </p>
                    <Table height="140" :columns="reviewColumns" :data="reviewData"></Table>
                </Card>
            </Col>
            <Col span="16">
                <Card class="books-table clearfix">
                    <p slot="title">
                        <Icon type="bookmark"></Icon>
                        今日待复习
                    </p>
                    <Table :columns="booksColumns" :data="booksData"></Table>
                </Card>
            </Col>
        </Row>
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
                reviewColumns: [
                    {
                        title: '书名',
                        key: 'name'
                    },
                    {
                        title: '页码',
                        key: 'page'
                    },
                    {
                        title: '操作',
                        key: 'operate',
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
                                            this.show(params.index)
                                        }
                                    }
                                }, '已复习')
                            ]);
                        }
                    }
                ],
                reviewData: [
                    {
                        name: 'javascript权威指南',
                        page: '0-100',
                        operate: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    }
                ],
                booksColumns: [
                    {
                        title: '书名',
                        key: 'name'
                    },
                    {
                        title: '进度',
                        key: 'progress',
                        render: (h, params) => {
                            return h('div', [
                                h('Progress', {
                                    props: {
                                        status: 'active',
                                        percent: params.row.progress
                                    }
                                })
                            ])
                        }
                    },
                    {
                        title: '操作',
                        key: 'operate',
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
                                            this.show(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                booksData: [
                    {
                        name: 'javascript权威指南',
                        progress: '10',
                        operate: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    }
                ],
            }
        },
        methods: {
            addBook () {
                const vm = this;
                axios.post('http://localhost:3000/book/addBook',{
                    bookName: vm.addBookData.bookName,
                    bookPageNumber: vm.addBookData.bookPageNumber
                })
                    .then(function (response) {
                        if(response.data.state === 1) {
                            console.log('新增成功');
                        }else if(response.data.state === 0) {
                            console.log('新增失败');
                        }else {
                            console.log(response)
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    };
</script>

<style lang="less" scoped="">
    .reading, .review-table {
        width: 90%;
        margin: auto;
    }

    .reading .ivu-input-type,
    .reading .ivu-select-selection {
        margin-top: 15px;
    }

    .reading button {
        margin: 15px 0;
        float: right;
    }

    .books-table {
        width: 95%;
        margin-top: 30px;
    }


</style>
