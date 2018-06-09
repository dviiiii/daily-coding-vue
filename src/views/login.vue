<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录!
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入用户名密码</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import axios from  'axios';

export default {
    data () {
        return {
            form: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            const vm = this;
            this.$refs.loginForm.validate((valid) => {
                if (valid) {


                }
            });

            axios.post('/api/login/login',{
                user: vm.form.userName,
                psd: vm.form.password
            })
            .then(function (response) {
                    if(response.data.state === 1) {
                    console.log('登陆成功');
                    Cookies.set('user', vm.form.userName);
//                    vm.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
//                    if (this.form.userName === 'iview_admin') {
//                        Cookies.set('access', 0);
//                    } else {
//                        Cookies.set('access', 1);
//                    }
                        vm.$router.push({
                            name: 'home_index'
                        });
                    }else if(response.data.state === 0) {
                        console.log('账号密码错误');
                    }else {
                        console.log(response)
                    }
                })
            .catch(function (error) {
                    vm.$Message.error('登录失败,服务器错误！');
                    console.log(error);
                });
        }
    }
};
</script>

<style>

</style>
