(function () {
  'use strict';

  var IOS_STORE_URL = 'https://apps.apple.com/sz/app/cirkleup/id6768386988';
  var ANDROID_STORE_URL = 'https://play.google.com/store/apps/details?id=com.cirkleup.app';

  var pathParts = window.location.pathname.split('/').filter(Boolean);
  var postId = pathParts[0] === 'share' ? pathParts[1] : null;

  function getPlatform() {
    var ua = navigator.userAgent || navigator.vendor || window.opera || '';

    if (/android/i.test(ua)) return 'android';

    if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return 'ios';

    if (
      navigator.platform === 'MacIntel' &&
      navigator.maxTouchPoints &&
      navigator.maxTouchPoints > 1
    ) {
      return 'ios';
    }

    return 'other';
  }

  function getStoreUrl(platform) {
    if (platform === 'ios') return IOS_STORE_URL;
    if (platform === 'android') return ANDROID_STORE_URL;
    return null;
  }

  function setPlatformButtons(platform) {
    var iosBtn = document.getElementById('iosStoreButton');
    var androidBtn = document.getElementById('androidStoreButton');

    if (platform === 'ios' && androidBtn) {
      androidBtn.hidden = true;
    } else if (platform === 'android' && iosBtn) {
      iosBtn.hidden = true;
    }
  }

  if (postId) {
    document.documentElement.classList.add('has-post');
    document.documentElement.classList.remove('no-post');
    document.title = 'Opening in CirkleUp…';

    var deepLink = 'cirkleup://cirkleup.com/postDetail?postId=' + encodeURIComponent(postId);
    var platform = getPlatform();
    var storeUrl = getStoreUrl(platform);

    setPlatformButtons(platform);

    window.location.href = deepLink;

    if (storeUrl) {
      setTimeout(function () {
        if (!document.hidden) {
          window.location.href = storeUrl;
        }
      }, 1500);
    }

    var openAppButton = document.getElementById('openAppButton');
    if (openAppButton) {
      openAppButton.addEventListener('click', function () {
        window.location.href = deepLink;
      });
    }

    var iosStoreButton = document.getElementById('iosStoreButton');
    if (iosStoreButton) {
      iosStoreButton.addEventListener('click', function () {
        window.location.href = IOS_STORE_URL;
      });
    }

    var androidStoreButton = document.getElementById('androidStoreButton');
    if (androidStoreButton) {
      androidStoreButton.addEventListener('click', function () {
        window.location.href = ANDROID_STORE_URL;
      });
    }
  } else {
    document.documentElement.classList.add('no-post');
    document.documentElement.classList.remove('has-post');
    document.title = 'Invalid share link — CirkleUp';
  }
})();
