<template>
    <section class="content">
        <div class="row">
            <div class="col-md-8">
                <form class="form-horizontal" v-on:submit.prevent="onSave">
                    <div class="box box-primary">
                        <div class="overlay" v-if="isLoading">
                            <i class="fa fa-refresh fa-spin"></i>
                        </div>
                        <div class="box-header with-border">
                            <h3 class="box-title">
                                連絡先 追加・編集
                            </h3>
                        </div>
                        <div class="box-body" v-if="selectItem">
                            <div v-if="status == 'success'" class="alert alert-success">
                                {{message}}
                            </div>
                            <div v-else-if="status == 'error'" class="alert alert-error">
                                {{message}}
                            </div>

                            <div class="form-group" :class="errors.id ? 'has-error' : ''">
                                <label class="control-label col-xs-3" for="inputId">アドレス帳ID</label>
                                <div class="col-xs-7">
                                    <input type="text" class="form-control input-sm" id="inputId"
                                           placeholder="アドレス帳ID" readonly="readonly" v-model="selectItem.id">
                                    <span class="help-block" v-if="errors.id">
                                        <ul>
                                            <li v-for="item in errors.id">
                                                {{ item }}
                                            </li>
                                        </ul>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group" :class="errors.position ? 'has-error' : ''">
                                <label class="control-label col-xs-3" for="inputPosition">役職</label>
                                <div class="col-xs-7">
                                    <input type="text" class="form-control input-sm" id="inputPosition"
                                           placeholder="役職" v-model="selectItem.position">
                                    <span class="help-block" v-if="errors.position">
                                        <ul>
                                            <li v-for="item in errors.position">
                                                {{ item }}
                                            </li>
                                        </ul>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group" :class="errors.name_kana ? 'has-error' : ''">
                                <label class="control-label col-xs-3" for="inputNameKana">名前(カナ)</label>
                                <div class="col-xs-7">
                                    <input type="text" class="form-control input-sm" id="inputNameKana"
                                           placeholder="名前(カナ)" v-model="selectItem.name_kana">
                                    <span class="help-block" v-if="errors.name_kana">
                                        <ul>
                                            <li v-for="item in errors.name_kana">
                                                {{ item }}
                                            </li>
                                        </ul>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group" :class="errors.name ? 'has-error' : ''">
                                <label class="control-label col-xs-3" for="inputName">名前</label>
                                <div class="col-xs-7">
                                    <input type="text" class="form-control input-sm" id="inputName"
                                           placeholder="名前" v-model="selectItem.name">
                                    <span class="help-block" v-if="errors.name">
                                        <ul>
                                            <li v-for="item in errors.name">
                                                {{ item }}
                                            </li>
                                        </ul>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group" :class="errors.type ? 'has-error' : ''">
                                <label class="control-label col-xs-3" for="inputType">電話帳種別</label>
                                <div class="col-xs-7">
                                    <select class="form-control input-sm" id="inputType" v-model="selectItem.type">
                                        <option v-for="(value, key) in addressBookType" v-bind:value="key">
                                            {{ value }}
                                        </option>
                                    </select>
                                    <span class="help-block" v-if="errors.type">
                                        <ul>
                                            <li v-for="item in errors.type">
                                                {{ item }}
                                            </li>
                                        </ul>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group" :class="errors.groupid ? 'has-error' : ''">
                                <label class="control-label col-xs-3" for="inputGroup">所属グループ</label>
                                <div class="col-xs-7">
                                    <select class="form-control input-sm" id="inputGroup"
                                            v-model="selectItem.groupid">
                                        <option v-for="item in addressBookGroup[selectItem.type]"
                                                v-bind:value="item.id">
                                            {{ item.full_group_name }}
                                        </option>
                                    </select>
                                    <span class="help-block" v-if="errors.groupid">
                                        <ul>
                                            <li v-for="item in errors.groupid">
                                                {{ item }}
                                            </li>
                                        </ul>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group" :class="errors.tel1 ? 'has-error' : ''">
                                <label class="control-label col-xs-3" for="inputTel1">電話番号1</label>
                                <div class="col-xs-7">
                                    <input type="text" class="form-control input-sm" id="inputTel1"
                                           placeholder="電話番号1" v-model="selectItem.tel1">
                                    <span class="help-block" v-if="errors.tel1">
                                        <ul>
                                            <li v-for="item in errors.tel1">
                                                {{ item }}
                                            </li>
                                        </ul>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group" :class="errors.tel2 ? 'has-error' : ''">
                                <label class="control-label col-xs-3" for="inputTel2">電話番号2</label>
                                <div class="col-xs-7">
                                    <input type="text" class="form-control input-sm" id="inputTel2"
                                           placeholder="電話番号2" v-model="selectItem.tel2">
                                    <span class="help-block" v-if="errors.tel2">
                                        <ul>
                                            <li v-for="item in errors.tel2">
                                                {{ item }}
                                            </li>
                                        </ul>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group" :class="errors.tel3 ? 'has-error' : ''">
                                <label class="control-label col-xs-3" for="inputTel3">電話番号3</label>
                                <div class="col-xs-7">
                                    <input type="text" class="form-control input-sm" id="inputTel3"
                                           placeholder="電話番号3" v-model="selectItem.tel3">
                                    <span class="help-block" v-if="errors.tel3">
                                        <ul>
                                            <li v-for="item in errors.tel3">
                                                {{ item }}
                                            </li>
                                        </ul>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group" :class="errors.email ? 'has-error' : ''">
                                <label class="control-label col-xs-3" for="inputEmail">メールアドレス</label>
                                <div class="col-xs-7">
                                    <input type="email" class="form-control input-sm" id="inputEmail"
                                           placeholder="メールアドレス" v-model="selectItem.email">
                                    <span class="help-block" v-if="errors.email">
                                        <ul>
                                            <li v-for="item in errors.email">
                                                {{ item }}
                                            </li>
                                        </ul>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group" :class="errors.comment ? 'has-error' : ''">
                                <label class="control-label col-xs-3" for="inputComment">備考</label>
                                <div class="col-xs-7">
                                    <input type="text" class="form-control input-sm" id="inputComment"
                                           placeholder="備考" v-model="selectItem.comment">
                                    <span class="help-block" v-if="errors.comment">
                                        <ul>
                                            <li v-for="item in errors.comment">
                                                {{ item }}
                                            </li>
                                        </ul>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group" :class="errors.owner_userid ? 'has-error' : ''">
                                <label class="control-label col-xs-3" for="inputOwnerUserId">所有ユーザ</label>
                                <div class="col-xs-7">
                                    <el-select
                                            v-model="selectItem.owner_userid"
                                            filterable
                                            clearable
                                            placeholder="所有ユーザ">
                                        <el-option
                                                v-for="item in selOwnerItems"
                                                :key="item.id"
                                                :label="item.display_name + ' / ' + item.username"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                    <span class="help-block" v-if="errors.owner_userid">
                                        <ul>
                                            <li v-for="item in errors.owner_userid" :key="item">
                                                {{ item }}
                                            </li>
                                        </ul>
                                    </span>
                                </div>
                            </div>

                        </div>
                        <div class="box-footer">
                            <button type="submit" class="btn btn-primary pull-right">保存</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>
<script>
    import Vue from 'vue'

    export default {
        data() {
            return {
                selectItem: null,
                // Validation
                status: null,
                message: null,
                errors: [],
                // 読み込み中かどうか
                isLoading: true,
                selOwnerLoading: false,
                selOwnerItems: [],
                // ページ上のデータ
                addressBookType: [],
                addressBookGroup: [],
            }
        },
        methods: {
            onSave(){
                var _this = this

                _this.isLoading = true

                // 初期化
                _this.status = null
                _this.message = null
                _this.errors = []

                // 編集処理
                axios.post('/addressbook/edit', _this.selectItem)
                    .then(function (response) {
                        _this.isLoading = false

                        // 一覧ページに戻す
                        _this.$router.push({
                            path: '/AddressBook',
                            query: {
                                typeId: _this.selectItem.type,
                                groupId: _this.selectItem.groupid,
                            }
                        })

                        _this.$message({
                            type: response.data.status,
                            message: response.data.message,
                        });

                    })
                    .catch(function (error) {
                        _this.isLoading = false
                        _this.status = 'error'

                        if (error.response.status === 422) {
                            // 422 - Validation Error
                            _this.message = '入力に問題があります。'

                            _this.errors = error.response.data.errors
                        } else {
                            _this.message = 'エラーが発生しました。'
                        }
                    });
            }
        },
        mounted() {
            var _this = this

            _this.isLoading = true

            if (this.$route.params.id) {
                // Read
                axios.get('/addressbook/detail', {
                    params: {
                        id: this.$route.params.id
                    }
                })
                    .then(function (response) {
                        // UIが崩れるため、0の場合は空白とする
                        if (parseInt(response.data.owner_userid) === 0) {
                            response.data.owner_userid = ''
                        }

                        _this.selectItem = response.data

                        _this.isLoading = false
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                _this.selectItem = {
                    type: 1
                }

                _this.isLoading = false
            }
        },
        events: {
            'AddressBook:updateGroup': function (group) {
                this.addressBookGroup = group
            },
        },
        created() {
            this.addressBookGroup = this.$parent.$data.addressBookGroup
            this.addressBookType = this.$parent.$data.addressBookType
            this.$root.sidebar = this.$route.matched.some(record => record.components.sidebar)

            var _this = this

            // ユーザ一覧を取得
            axios.get('/user/users')
                .then(function (response) {
                    _this.selOwnerLoading = false
                    _this.selOwnerItems = response.data
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
    }
</script>
<style>
</style>