document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('responsive-video');
    if (!video) return;

    // 기본 포스터 경로
    const posterBasePath = 'https://www.bodyfriend.co.kr/upload/banner/main/';

    // 디바이스 크기에 따른 비디오 소스 설정
    function setVideoSource() {
        let videoSrc = '';
        const width = window.innerWidth;

        if (width >= 1200) {
            videoSrc = video.getAttribute('data-vd1080');
        } else if (width >= 992) {
            videoSrc = video.getAttribute('data-vd720');
        } else if (width >= 768) {
            videoSrc = video.getAttribute('data-vd540');
        } else {
            videoSrc = video.getAttribute('data-vd360');
        }

        // 비디오 소스 설정
        if (videoSrc) {
            const source = video.querySelector('source');
            if (source) {
                source.src = videoSrc;
                video.load();
            } else {
                // source 태그가 없는 경우 직접 src 속성 설정
                video.src = videoSrc;
            }
        }

        // 디바이스에 맞는 포스터 이미지 설정
        setPosterImage();
    }

    // 디바이스 크기에 따른 포스터 이미지 설정
    function setPosterImage() {
        const width = window.innerWidth;
        let posterFile;

        if (width >= 768) {
            posterFile = video.getAttribute('data-posterpc');
        } else {
            posterFile = video.getAttribute('data-postermb');
        }

        if (posterFile) {
            video.poster = posterBasePath + posterFile;
        }
    }

    // 비디오 오류 처리
    video.addEventListener('error', function () {
        console.log('비디오 로딩 실패, 포스터 이미지 표시');
        video.style.display = 'none';

        // 비디오 대신 이미지 표시
        const imgElement = document.createElement('img');
        imgElement.src = video.poster;
        imgElement.alt = '비디오 대체 이미지';
        imgElement.style.width = '100%';
        imgElement.style.height = 'auto';

        video.parentNode.insertBefore(imgElement, video.nextSibling);
    });

    // 초기 설정
    setVideoSource();

    // 화면 크기 변경 시 대응
    window.addEventListener('resize', function () {
        setVideoSource();
    });
});


// 탭
document.addEventListener('DOMContentLoaded', function () {
    var tabs = document.querySelectorAll('button.button-tab');
    var questions = document.querySelectorAll('details.accordion');

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var tabTag = tab.getAttribute('data-tag');
            // Remove 'active' class from all tabs
            tabs.forEach(function (t) {
                t.classList.remove('button-tab--active');
            });

            // Add 'active' class to clicked tab
            tab.classList.add('button-tab--active');

            // Hide all questions
            questions.forEach(function (q) {
                var tagValue = q.getAttribute('data-tag');

                if (tabTag == tagValue) {
                    q.classList.add('active');
                } else {
                    q.classList.remove('active');
                }
            });
        });
    });

    // Show the first tab and question by default
    tabs[0].click();
});
