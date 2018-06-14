<style scoped lang="less">
    .index{
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        h1{
            height: 150px;
            img{
                height: 100%;
            }
        }
        h2{
            color: #666;
            margin-bottom: 200px;
            p{
                margin: 0 0 50px;
            }
        }
        .ivu-row-flex{
            height: 100%;
        }
    }

    .container {
        width: 640px;
        margin: 20px auto;
        float: left;
    }

    .container img {
        width: 100%;
    }

    .preview {
        width: 100px;
        height: 100px;
        overflow: hidden;
        position: absolute;
        bottom: 50%;
        right: 100px;
    }
    .clearfix:after {
        content:"";
        display: block;
        clear:both;
    }



</style>
<style>
    .ivu-modal-body {
        overflow: hidden;
        position: relative;
    }
</style>
<style scoped>
    @import "cropper/css/cropper.css";
</style>
<template>
    <div class="index">
        <Row type="flex" justify="center" align="middle">
            <Col span="24">
            <h2>
                <Button type="ghost" @click="handleStart">Start iView</Button>
            </h2>
            </Col>
        </Row>

        <div>
            <Upload
                    :before-upload="handleUpload1"
                    action="">
                <Button type="ghost" icon="ios-cloud-upload-outline">Select the file to upload</Button>
            </Upload>
            <div v-if="file !== null">Upload file: {{ file.name }} <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button></div>
        </div>


        <Modal width="980"
               v-model="modal1"
               title="更换照片"
               @on-ok="ok"
               @on-cancel="cancel">
            <div class="container clearfix">
                <div>
                    <img id="image" :src="imgUrl" alt="Picture">
                </div>
            </div>
            <div class="preview"></div>
            <Upload
                    :before-upload="handleUpload"
                    action="//"
                    :show-upload-list="false"
                    :format="['jpg','jpeg','png']"
                    :on-format-error="handleFormatError"
            >
                <Button type="ghost" icon="ios-cloud-upload-outline">选择图片</Button>
            </Upload>
        </Modal>
    </div>
</template>
<script>
    import Cropper from 'cropperjs';
    let corpperObj;
    import axios from  'axios';

    export default {
        data () {
            return {
                modal1: false,
                imgUrl: '/src/views/test/cropper/img/picture.jpg',
                file: null,

            }
        },
        mounted() {

        },
        methods: {
            handleUpload1 (file) {
                this.file = file;
                return false;
            },
            upload () {
                let params = new FormData();
                // 将readyFile中的文件添加到FormData中
//                this.file.forEach(file => params.append(file.name, file));
                console.log(this.file)
                params.append('file', this.file)
                // params.append('Authorization', sessionStorage.JWT_TOKEN); // token验证上传权限
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                axios.post('/api/test/upfile', params, config)
                    .then(res => {
//                        if (res.data.status === '1') {
//                            this.readyFiles = [];
//                            this.handleSuccessUpload();// 由于是手工制作的上传，所以上传成功也不会触发iview组件的成功回掉函数
//                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            handleUpload (file) {
                const vm = this;
                const image = document.getElementById('image');
                if (URL) {
//                    image.src = URL.createObjectURL(file)
                    vm.imgUrl = URL.createObjectURL(file)
                } else if (FileReader) {
                    reader = new FileReader();
                    reader.onload = function (e) {
//                        image.src = reader.result;
                        vm.imgUrl = reader.result;
                    };
                    reader.readAsDataURL(file);
                }

                corpperObj.destroy();
                vm.initCropper();
                return false;
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件类型错误',
                    desc: '文件 ' + file.name + ' 类型错误, 请选择jpg或者png类型图片.'
                });
            },
            handleStart () {
                this.modal1 =true;
                this.initCropper();
            },
            ok () {
                const vm = this;
                const cutImg = corpperObj.getCroppedCanvas({ maxWidth: 4096, maxHeight: 4096 });
                const cutImgData = cutImg.toDataURL("image/png");
                const b64 = cutImgData.substring(22);
                axios.post('/api/test/uploadImg',{data: b64})
                    .then(function (res) {
                        if(res.data.state === 0) {
                            vm.$Message.success('上传成功！');
                        }else if(res.data.state === 1) {
                            vm.$Message.error('上传失败！');
                        }else {
                            console.log(res)
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        vm.$Message.error('服务器错误！');
                    });
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },
            initCropper() {
                if(corpperObj) {
                    corpperObj.destroy();
                }

                const image = document.querySelector('#image');

                corpperObj = new Cropper(image, {
                    preview: '.preview',
                    aspectRatio: 1 / 1,
                    ready: function () {
                    },
                    crop: function (e) {
                    }
                });
            }
        }
    }
</script>
