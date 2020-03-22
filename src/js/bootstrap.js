window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

window.$ = window.jQuery = require('jquery');

require('bootstrap-sass');
require('admin-lte');
/**
 * Vue is a modern JavaScript library for building interactive web interfaces
 * using reactive data binding and reusable components. Vue's API is clean
 * and simple, leaving you to focus on building your next great project.
 */

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common = {
    'X-CSRF-TOKEN': window.Laravel.csrfToken,
    'X-Requested-With': 'XMLHttpRequest'
};

// JavaScript Error Handling
window.onerror = function(errorMsg, fileName, lineNumber) {
    var errorInfo = {
        'errorMsg'   : errorMsg,           // エラーメッセージ
        'fileName'   : fileName,           // エラーが発生したスクリプトのファイル名
        'lineNumber' : lineNumber,         // エラーが発生した行
        'urlDispPage': location.href,      // エラー発生時に閲覧していた URL
        'userAgent'  : navigator.userAgent // エラーが発生したクライアントのユーザエージェント
    };

    axios.post('/error/report', {
        message: errorInfo
    })
        .then(function (response) {
        })
        .catch(function (error) {
        });
};

import Echo from "laravel-echo"

if (typeof(io) != "undefined") {
    // ioが定義されていない場合は、実行しない
    window.echo = new Echo({
        broadcaster: 'socket.io',
        host: window.location.hostname + ':6001',
        auth: {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('default-auth-token')
            }
        }
    });
}

window.extStatus = {
    'unknown': {
        'statusClass': 'fa fa-circle text-gray',
        'statusText': '不明'
    },
    'idle': {
        'statusClass': 'fa fa-circle text-info',
        'statusText': 'アイドル'
    },
    'away': {
        'statusClass': 'fa fa-circle text-primary',
        'statusText': '不在'
    },
    'callforward':{
        'statusClass': 'fa fa-circle text-teal',
        'statusText': '不在転送'
    },
    'busy': {
        'statusClass': 'fa fa-circle text-danger',
        'statusText': '通話中'
    },
};
