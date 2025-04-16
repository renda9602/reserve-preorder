const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const path = require('path');
const browserSync = require('browser-sync').create();

// SCSS 컴파일 작업
gulp.task('compile-sass', function () {
    return gulp
        .src('src/scss/**/*.scss')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(
            gulp.dest(function (file) {
                return path.join(file.base, '..', 'css');
            })
        )
        .pipe(rename({ extname: '.min.css' }))
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(
            gulp.dest(function (file) {
                return path.join(file.base, '..', 'css');
            })
        )
        .pipe(browserSync.stream()); // 변경사항을 브라우저에 반영
});

// 로컬 서버 시작
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: './src/', // 프로젝트 루트 디렉토리 (필요에 따라 조정)
            index: 'index.html', // 기본 페이지
        },
        port: 8080,
        open: true, // 브라우저 자동 실행
        notify: false, // 브라우저 알림 비활성화
    });

    // HTML, JS 파일 변경 감지
    gulp.watch(['*.html', 'src/js/**/*.js']).on('change', browserSync.reload);
});

// SCSS 파일 변경 감시
gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', gulp.series('compile-sass'));
});

// 개발 모드 (빌드 + 서버 + 감시)
gulp.task('dev', gulp.parallel('compile-sass', 'serve', 'watch'));

// 기본 작업 정의
gulp.task('default', gulp.series('compile-sass', 'watch'));
