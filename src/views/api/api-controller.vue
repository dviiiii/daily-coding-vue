


<template>
    <div>
        <div class="api clearfix">
            <div class="">
                <Card class="clearfix">
                    <p slot="title">
                        <Icon type="paper-airplane"></Icon>
                        api
                    </p>
                    <div class="api-type clearfix">
                        <div class="api-book" :class="{active: type.apiTypeName === selectApiTypeName}" v-for="type in apiTypeData" @click="selectApiType(type)">
                            <span>{{type.apiTypeName}}</span>
                        </div>

                        <div class="api-book" @click="showAddApi">
                            <Icon type="android-add"></Icon>
                        </div>
                    </div>
                </Card>
            </div>
            <div>
                <Card class="clearfix">
                    <div slot="title" class="box-title">
                        <Input v-model="apiKW" icon="search" placeholder="输入关键字查询..." style="width: 200px;"></Input>
                    </div>
                    <div class="clearfix">
                        <Table border :columns="apiItem" :data="apiItemData"></Table>
                    </div>
                </Card>
            </div>
            <div>
                <Card class="clearfix">
                    <al-selector level="1" v-model="res_s"/>
                    <al-cascader level="2" v-model="res_c"/>
                </Card>
            </div>
        </div>

        <div class="side-right">
            <Card class="clearfix">
                <p slot="title">
                    <Icon type="gear-b"></Icon>
                    操作
                </p>
                <div class="clearfix">
                    <Button type="error" long @click="deleteApiType">删除API类别</Button>
                    <Button type="success" long @click="addApiItemBtn">新增API</Button>
                </div>
            </Card>
        </div>

        <Modal v-model="modelData.addApiTypeModal" title="新增api类别" @on-ok="addApiType">
            <Input v-model="addApiTypeName" placeholder="输入API类别"></Input>
        </Modal>
        <Modal v-model="modelData.addApiItemModal" title="新增apiItem" width="1000px">
            <Input v-model="addApiItemData.apiItemTitle" placeholder="输入API"></Input>
            <div class="apiItem-detail clearfix">
                <div class="fLeft box">
                    <Input v-model="addApiItemData.apiItemDetail" type="textarea" :autosize="{ minRows: 21, maxRows: 21 }"></Input>
                </div>
                <div class="fRight box content-preview">
                    <div class="content-html" v-html="addApiItemData.apiItemDetailMD"></div>
                </div>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" @click="addApiItem">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import axios from  'axios';
    import marked from  'marked';
//    require('src/plugin/highlight/highlight.min');
    import highlight from '../../plugin/highlight/highlight.min';

    export default {
        name: 'books',
        data () {
            return {
                res_s: [],
                res_c: [],
                modelData: {
                    addApiTypeModal: false,
                    addApiItemModal: false
                },
                apiKW: '',
                addApiTypeName: '',
                apiTypeData: [],
                selectApiTypeName: '',
                addApiItemData: {
                    apiItemTitle: '',
                    apiItemDetail: '',
                    apiItemDetailMD: ''
                },
                apiItem: [
                    {
                        title: 'apiItem',
                        key: 'apiItemTitle',
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
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
                                            this.showItem(params.index)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.removeItem(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                apiItemData: []
            }
        },
        watch: {
            'addApiItemData.apiItemDetail' : function (val) {
                this.addApiItemData.apiItemDetailMD = marked(val);
            }
        },
        mounted () {
            this.queryApiType();
            this.queryApiItem();

            marked.setOptions({
                renderer: new marked.Renderer(),
                gfm: true,
                tables: true,
                breaks: false,
                pedantic: false,
                sanitize: false,
                smartLists: true,
                smartypants: false,
                highlight: function (code) {
                    return highlight.highlightAuto(code).value;
                }
            });
        },
        methods: {

            showAddApi () {
                this.modelData.addApiModal = true;
            },
            //新增api类别
            addApiType () {
                const vm = this;

                if(!vm.addApiTypeName) {
                    vm.$Message.warning('API类名不能为空！');
                    return false;
                }

                axios.post('/api/api/addApiType',{apiTypeName: vm.addApiTypeName})
                    .then(function (response) {
                        if(response.data.state === 1) {
                            vm.$Message.success('新增成功！');
                            vm.queryApiType();
                        }else if(response.data.state === 0) {
                            vm.$Message.error('新增失败！');
                        }else if(response.data.state === 2) {
                            vm.$Message.warning('不得重复增加！');
                        }else {
                            console.log(response)
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        vm.$Message.error('服务器错误！');
                    });
            },
            //删除api类别
            deleteApiType () {
                const vm = this;

                if(!vm.selectApiTypeName) {
                    vm.$Message.warning('请先选择Api类别!');
                    return false;
                }

                axios.post('/api/api/deleteApiType',{apiTypeName: vm.selectApiTypeName})
                    .then(function (response) {
                        if(response.data.state === 1) {
                            vm.$Message.success('删除成功！');
                            vm.queryApiType();
                        }else if(response.data.state === 0) {
                            vm.$Message.error('删除失败！');
                        }else {
                            console.log(response)
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        vm.$Message.error('服务器错误！');
                    });
            },
            //查询API类别
            queryApiType () {
                const vm = this;
                vm.selectApiTypeName = '';
                axios.get('/api/api/queryApiType')
                    .then(function (res) {
                        if(res.data.state === 0) {
                            vm.$Message.error('获取API类别信息失败！');
                        }else {
                            vm.apiTypeData = res.data;
                            console.log(res.data)
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                        vm.$Message.error('服务器错误！');
                    })
            },
            selectApiType (type) {
                this.selectApiTypeName = type.apiTypeName;
            },
            addApiItemBtn () {
                if(!this.selectApiTypeName) {
                    this.$Message.warning('请先选择Api类别!');
                    return false;
                }
                this.modelData.addApiItemModal = true;
            },
            addApiItem () {
                const vm = this;
                if(!vm.addApiItemData.apiItemTitle) {
                    vm.$Message.warning('请填写api名称!');
                    return false;
                }
                if(!vm.addApiItemData.apiItemDetailMD) {
                    vm.$Message.warning('请填写api内容!');
                    return false;
                }

                const opt = {
                    apiTypeName: vm.selectApiTypeName,
                    apiItemTitle: vm.addApiItemData.apiItemTitle,
                    apiItemDetailMD: vm.addApiItemData.apiItemDetailMD
                };

                axios.post('/api/api/addApiItem',opt)
                    .then(function (response) {
                        if(response.data.state === 1) {
                            vm.$Message.success('新增成功！');
                        }else if(response.data.state === 0) {
                            vm.$Message.error('新增失败！');
                        }else if(response.data.state === 2) {
                            vm.$Message.warning('不得重复增加！');
                        }else {
                            console.log(response)
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        vm.$Message.error('服务器错误！');
                    });
            },
            queryApiItem () {
                const vm = this;
                const opt = {apiTypeName: vm.selectApiTypeName, apiItemTitle: vm.apiTypeData.apiItemTitle};
                axios.post('/api/api/queryApiItem', opt)
                    .then(function (res) {
                        if(res.data.state === 0) {
                            vm.$Message.error('获取API信息失败！');
                        }else {
                            vm.apiItemData = res.data;
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                        vm.$Message.error('服务器错误！');
                    })
            },
            showItem (index) {
//                this.$Modal.info({
//                    title: 'User Info',
//                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
//                })
            },
            removeItem (index) {
//                this.data6.splice(index, 1);
            }

        }
    };
</script>

<style>
    .api {
        width: 66%;
        float: left;
    }

    .api-book {
        float: left;
        cursor: pointer;
        width: 80px;
        height: 100px;
        margin-left: 40px;
        text-align: center;
        color: #fff;
        background: url(../../images/icon_sprite.png) -3px -1650px no-repeat;
    }

    .api-book:hover {
        background: url(../../images/icon_sprite.png) -3px -1512px no-repeat;
    }

    .api-book.active {
        background: url(../../images/icon_sprite.png) -3px -1512px no-repeat;
    }

    .api-book i {
        font-size: 86px;
    }

    .api-book span {
        line-height: 80px;
    }

    .box-title {
        text-align: center;
    }

    .side-right {
        width: 33%;
        float: right;
    }

    .side-right button+button {
        margin-top: 20px;
    }

    .apiItem-detail {
        margin-top: 15px;
    }

    .apiItem-detail .box {
        width: 49%;
        height: 450px;
        border: 1px solid #ededed;
    }

    .fRight.box {
        overflow-y: auto;
    }
</style>

<style>
    .content-preview .content-html{padding:.8em 2em 12em;font-size:1.334rem;line-height:1.7;word-break:break-word;overflow-x:hidden}.content-preview .content-html::-webkit-scrollbar{display:none}.content-preview .content-html h1{margin:1em 0;line-height:1.2}.content-preview .content-html p{line-height:1.7em}.content-preview .content-html img,.content-preview .content-html video{max-width:100%;max-height:668px}.content-preview .content-html img.full-screen{max-height:none}.content-preview .content-html figure{margin:2em auto;text-align:center}.content-preview .content-html figure figcaption{text-align:center;font-size:.8em;line-height:2em;color:#909090}.content-preview .content-html pre{font-family:Menlo,Monaco,Consolas,Courier New,monospace;line-height:1.45em}.content-preview .content-html code{font-family:Menlo,Monaco,Consolas,Courier New,monospace;font-size:.8em;padding:.2em .4em;word-break:break-word;color:#4e5980;background-color:#f8f8f8;border-radius:2px}.content-preview .content-html pre>code{font-size:.8em;padding:.5em 1em;margin:0;word-break:normal;display:block;color:#333}.content-preview .content-html a{color:#259}.content-preview .content-html a:active,.content-preview .content-html a:hover{color:#275b8c}.content-preview .content-html table{font-size:.8em;max-width:100%;overflow:auto;border:1px solid #f6f6f6;border-collapse:collapse;border-spacing:0}.content-preview .content-html thead{background:#f6f6f6;color:#000;text-align:left}.content-preview .content-html tr:nth-child(2n){background-color:#fcfcfc}.content-preview .content-html td,.content-preview .content-html th{padding:.8em .5em;line-height:1.5em}.content-preview .content-html td{min-width:7.5em}.content-preview .content-html blockquote{margin:1em 0;border-left:4px solid #ddd;padding:0 1em;color:#666}.content-preview .content-html blockquote>p{margin:.5em 0}.content-preview .content-html ol,.content-preview .content-html ul{padding-left:2em}.content-preview .content-html ol li,.content-preview .content-html ul li{margin-bottom:.5em}.content-preview .content-html ol ol,.content-preview .content-html ol ul,.content-preview .content-html ul ol,.content-preview .content-html ul ul{margin-top:.2em}.content-preview .content-html pre>code.hljs{overflow-x:auto;-webkit-overflow-scrolling:touch;color:#333;background:#f8f8f8}.content-preview .content-html .hljs-comment,.content-preview .content-html .hljs-quote{color:#998;font-style:italic}.content-preview .content-html .hljs-keyword,.content-preview .content-html .hljs-selector-tag,.content-preview .content-html .hljs-subst{color:#333;font-weight:700}.content-preview .content-html .hljs-literal,.content-preview .content-html .hljs-number,.content-preview .content-html .hljs-tag .hljs-attr,.content-preview .content-html .hljs-template-variable,.content-preview .content-html .hljs-variable{color:teal}.content-preview .content-html .hljs-doctag,.content-preview .content-html .hljs-string{color:#d14}.content-preview .content-html .hljs-section,.content-preview .content-html .hljs-selector-id,.content-preview .content-html .hljs-title{color:#900;font-weight:700}.content-preview .content-html .hljs-subst{font-weight:400}.content-preview .content-html .hljs-class .hljs-title,.content-preview .content-html .hljs-type{color:#458;font-weight:700}.content-preview .content-html .hljs-attribute,.content-preview .content-html .hljs-name,.content-preview .content-html .hljs-tag{color:navy;font-weight:400}.content-preview .content-html .hljs-link,.content-preview .content-html .hljs-regexp{color:#009926}.content-preview .content-html .hljs-bullet,.content-preview .content-html .hljs-symbol{color:#990073}.content-preview .content-html .hljs-built_in,.content-preview .content-html .hljs-builtin-name{color:#0086b3}.content-preview .content-html .hljs-meta{color:#999;font-weight:700}.content-preview .content-html .hljs-deletion{background:#fdd}.content-preview .content-html .hljs-addition{background:#dfd}.content-preview .content-html .hljs-emphasis{font-style:italic}.content-preview .content-html .hljs-strong{font-weight:700}.content-preview .content-html img[src^="http:"i]{-webkit-animation:http-image 1.5s ease-in-out alternate infinite;animation:http-image 1.5s ease-in-out alternate infinite}@-webkit-keyframes http-image{0%{opacity:.5}to{opacity:1}}@keyframes http-image{0%{opacity:.5}to{opacity:1}}
</style>
