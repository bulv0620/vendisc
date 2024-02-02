<template>
    <div class="wrapper">
        <header>File Uploader</header>
        <form action="#" @click="handleFormClick" ref="form">
            <input class="file-input" type="file" name="file" hidden ref="fileInput" @change="handleInputChange">
            <box-icon type='solid' name='cloud-upload' size="lg" color="#6990F2"></box-icon>
            <p>Browse File to Upload</p>
        </form>
        <div class="status">
            <section class="progress-area" :class="uploadedAreaClass">
                <li class="row" v-for="(item, i) in uploadingList" :key="i" v-show="!item.finished">
                    <box-icon name='file' type='solid' color="#6990F2" size="md"></box-icon>
                    <div class="content">

                        <div class="details">
                            <span class="name">{{item.uploadingName}} • Uploading</span>
                            <span class="percent">{{item.uploadingRatio}}%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress" :style="{width: item.uploadingRatio + '%'}"></div>
                        </div>
                    </div>
                </li>
            </section>
            <section class="uploaded-area">
                <li class="row" v-for="(item, i) in uploadedList" :key="i">
                    <div class="content uploaded">
                        <box-icon name='file' type='solid' color="#6990F2" size="md"></box-icon>
                        <div class="details">
                            <span class="name">{{item.name}} • Uploaded</span>
                            <span class="size">{{item.fileSize}}</span>
                        </div>
                    </div>
                    <box-icon name='check-square' color="#6990F2"></box-icon>
                </li>
            </section>
        </div>
    </div>
</template>



<script>
import { calculateSize } from '@/utils/calc'
import { SERVER_URL } from '@/api/server';
export default {
    data: () => ({
        uploadedAreaClass: '',
        progressHtml: '',
        uploadingList: [],
        uploadedList: []
    }),
    methods: {
        abortAllTask() {
            this.uploadingList.forEach(task => {
                if(!task.finished) {
                    task.xhr.abort();
                }
            })
        }, 

        handleFormClick() {
            this.$refs.fileInput.click()
        },

        handleInputChange({ target }) {
            let file = target.files[0];
            if (file) {
                let fileName = file.name;
                if (fileName.length >= 50) {
                    this.$vs.notification({
                        icon: `<box-icon name='error-circle' color='white'></box-icon>`,
                        duration: 4000,
                        progress: "auto",
                        color: "danger",
                        position: "top-center",
                        title: "Error",
                        text: 'File name must be between 1-50'
                    });
                    return
                }
                if (fileName.length >= 13) {
                    let splitName = fileName.split('.');
                    fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
                }
                this.uploadFile(fileName); //calling uploadFile with passing file name as an argument
            }
        },

        uploadFile(name) {
            let xhr = new XMLHttpRequest();

            const newTask = {
                uploadingName: name,
                uploadingRatio: 0,
                finished: false,
                fileSize: null,
                xhr
            }
            let finishedTask = null;
            this.uploadingList.unshift(newTask)

            xhr.open("POST", `${SERVER_URL}/api/file/upload`);
            xhr.setRequestHeader('Authorization', this.$store.state.user.token);
            xhr.setRequestHeader('lid', this.$store.getters.curLid);
            xhr.upload.addEventListener("progress", ({ loaded, total }) => {
                let fileLoaded = Math.floor((loaded / total) * 100);

                newTask.uploadingRatio = fileLoaded

                this.uploadedAreaClass = 'onprogress';
                if (loaded == total) {
                    let fileTotal = Math.floor(total / 1000);
                    newTask.finished = true;
                    finishedTask = {
                        name,
                        fileSize: calculateSize(fileTotal * 1024)
                    }
                    this.uploadedList.unshift(finishedTask)
                }


            })
            xhr.addEventListener('readystatechange', () => {
                if (xhr.readyState === 4 && xhr.response) {
                    const res = JSON.parse(xhr.response);
                    if (res.code <= 0) {
                        this.uploadedList.splice(this.uploadedList.indexOf(finishedTask), 1);
                        this.$vs.notification({
                            icon: `<box-icon name='error-circle' color='white'></box-icon>`,
                            duration: 4000,
                            progress: "auto",
                            color: "danger",
                            position: "top-center",
                            title: "Error",
                            text: res.msg
                        });
                    }
                }
            })
            let data = new FormData(this.$refs.form);
            xhr.send(data);
        }
    }
}
</script>

<style scoped>
::selection {
    color: #fff;
    background: #6990F2;
}

.wrapper {
    width: 430px;
    background: #fff;
    border-radius: 5px;
    padding: 30px;
}

.wrapper header {
    color: #6990F2;
    font-size: 27px;
    font-weight: 600;
    text-align: center;
}

.wrapper form {
    height: 167px;
    display: flex;
    cursor: pointer;
    margin: 30px 0;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 12px;
    border: 2px dashed #6990F2;
}

form :where(i, p) {
    color: #6990F2;
}

form i {
    font-size: 50px;
}

form p {
    margin-top: 15px;
    font-size: 16px;
}

.status {
    max-height: 220px;
    overflow-y: auto;
}

section .row {
    margin-bottom: 10px;
    background: #E9F0FF;
    list-style: none;
    padding: 15px 20px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

section .row i {
    color: #6990F2;
    font-size: 30px;
}

section .details span {
    font-size: 14px;
}

.progress-area .row .content {
    width: 100%;
    margin-left: 15px;
}

.progress-area .details {
    display: flex;
    align-items: center;
    margin-bottom: 7px;
    justify-content: space-between;
}

.progress-area .content .progress-bar {
    height: 6px;
    width: 100%;
    margin-bottom: 4px;
    background: #fff;
    border-radius: 30px;
}

.content .progress-bar .progress {
    height: 100%;
    width: 0%;
    background: #6990F2;
    border-radius: inherit;
}

.uploaded-area.onprogress {
    max-height: 150px;
}

.uploaded-area::-webkit-scrollbar {
    width: 0px;
}

.uploaded-area .row .content {
    display: flex;
    align-items: center;
}

.uploaded-area .row .details {
    display: flex;
    margin-left: 15px;
    flex-direction: column;
}

.uploaded-area .row .details .size {
    color: #404040;
    font-size: 11px;
}

.uploaded-area i.fa-check {
    font-size: 16px;
}
</style>