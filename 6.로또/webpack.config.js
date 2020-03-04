const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.jsx', '.js', 'scss'], //확장자명 확인해서 알아서 적용
    },

    entry: {
        app: './client', //하나로 합칠 파일들 해당 파일안에서 import한 파일은 중복해서 작성할 필요 없음
    },

    module: {
        rules:[{ //바벨은 코드변환기이다.
            test: /\.jsx/, //정규식표현
            loader: 'babel-loader', //웹팩에서 바벨을 로드할때 이것을 사용한다. 최신식 문법을 예전 문법으로 변경하여 호환가능하게 변경해주는 역할
            options: {
                presets: [
                    ["@babel/preset-env", { //preset-env에는 여러 플러그인이 존재한다. 필요에 따라 검색해서 추가하기
                        targets: {
                            browsers: ['> 5% in KR', 'last 2 chrome versions'], //작성한 브라우저에서 실행가능하게 코드를 변경해줌
                        },
                        debug: true,
                    }],
                    "@babel/preset-react" //바벨을 리엑트에서 사용가능하게 해준다.
                ],
                plugins: [
                    "@babel/plugin-proposal-class-properties",
                    "react-hot-loader/babel",
            ],
            }
        }],
    },

    output: {
        path: path.join(__dirname, 'dist'), //__dirname 현재폴더
        filename: 'app.js',
        publicPath: '/dist/',
    }, //출력
};