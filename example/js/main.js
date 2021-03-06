player.innerHTML = '';

var utils = playease.utils,
    index = 0;

var ui = playease.ui();
// ui.addGlobalListener(console.log);
ui.addEventListener('screenshot', onScreenshot);
ui.addEventListener('error', console.error);
ui.setup(player, {
    autoplay: false,
    bufferLength: 0.5,       // sec.
    // file: 'http://127.0.0.1/vod/sample.mp4',
    // file: 'http://127.0.0.1/vod/sample.flv',
    // file: 'http://127.0.0.1/live/_definst_/stream02.flv',
    file: 'http://127.0.0.1/live/_definst_/stream02/video.m3u8',
    lowlatency: true,        // ll-dash, ll-hls, ll-flv/fmp4 (auto reduce latency due to cumulative ack of tcp)
    maxBufferLength: 1.5,    // sec.
    mode: 'live',
    module: 'FLV',
    loader: {
        name: 'auto',
        mode: 'cors',        // cors, no-cors, same-origin
        credentials: 'omit', // omit, include, same-origin
    },
    sources: [{
        file: 'http://127.0.0.1/live/_definst_/stream02/index.m3u8',
        label: 'hls',
    }, {
        file: 'http://127.0.0.1/live/_definst_/stream02.flv',
        label: 'http-flv',
        default: true,
    }],
    plugins: [{
        kind: 'Poster',
        file: 'image/poster.png',
        objectfit: 'contain',
        visibility: true,
    }, {
        kind: 'Display',
        layout: '[Button:play=][Button:waiting=][Label:error=][Panel:info=][Panel:stats=]',
        ondoubleclick: 'fullscreen',
        visibility: true,
    }, {
        kind: 'Controlbar',
        layout: '[Slider:timebar=Preview]|[Button:play=播放][Button:pause=暂停][Button:reload=重新加载][Button:stop=停止][Label:quote=Live broadcast][Label:time=00:00/00:00]||[Button:report=反馈][Button:capture=截图][Button:mute=静音][Button:unmute=取消静音][Slider:volumebar=80][Select:definition=清晰度][Button:danmuoff=关闭弹幕][Button:danmuon=打开弹幕][Button:fullpage=网页全屏][Button:exitfullpage=退出网页全屏][Button:fullscreen=全屏][Button:exitfullscreen=退出全屏]',
        autohide: false,
        visibility: true,
    }],
});

function onScreenshot(e) {
    var arr = e.data.image.split(',');
    var ret = arr[0].match(/^data:(image\/(.+));base64$/);
    if (ret === null) {
        console.error('The string did not match the expected pattern.');
        return;
    }

    var link = document.createElement('a');
    link.href = e.data.image;
    link.download = 'screenshot-' + utils.padStart(index++, 3, '0') + '.' + ret[2];
    link.click();
}

function onPlayClick() {
    ui.play(url.value);
}
