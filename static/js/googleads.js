(function (w, d, s, l, i) {
    w[l] = w[l] || []; w[l].push({
      'gtm.start':
        new Date().getTime(), event: 'gtm.js'
    }); var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
        'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', 'GTM-W29Z4T4');

  var googletag = googletag || {};
  googletag.cmd = googletag.cmd || [];
  (function () {
    var gads = document.createElement("script");
    gads.async = true;
    gads.type = "text/javascript";
    var useSSL = "https:" == document.location.protocol;
    gads.src = (useSSL ? "https:" : "http:") + "//www.googletagservices.com/tag/js/gpt.js";
    var node = document.getElementsByTagName("script")[0];
    node.parentNode.insertBefore(gads, node);
  })();

  var googletag = googletag || {};
  googletag.cmd = googletag.cmd || [];

  googletag.cmd.push(function() {
    googletag.defineSlot('/21750020995/squ-200-a', [200, 200], 'div-gpt-ad-1573235351291-0').addService(googletag.pubads());
  });

  googletag.cmd.push(function() {
    var sideAdSizes = googletag.sizeMapping().addSize([1366, 768], [300, 600]).addSize([1024, 768], [300,250]).addSize([0, 0], []).build();
    googletag.defineSlot('/21750020995/vert-w300', [[300, 600], [160, 600], [120, 600], [300, 250] ], 'div-gpt-ad-1573237100486-0').defineSizeMapping(sideAdSizes).addService(googletag.pubads());
  });

  googletag.cmd.push(function () {
    var bannerAdSizes = googletag.sizeMapping().addSize([1280, 768], [970, 90]).addSize([728, 300], [728, 90]).addSize([0, 0], [320, 100]).build();
    googletag.defineSlot('/21750020995/lg-banner', [[970, 90],[728, 90],[320, 100]], 'div-gpt-ad-1571325317379-0').defineSizeMapping(bannerAdSizes).addService(googletag.pubads());

  });

  googletag.cmd.push(function() {
    googletag.defineSlot('/21750020995/lg-banner', [[970, 90], [970, 250], [728, 90], [320, 50], [320, 100], [1180, 150]], 'div-gpt-ad-1663319531450-0').addService(googletag.pubads());

  });

  googletag.cmd.push(function () {
    googletag.defineSlot('/21750020995/xs-banner2', [320, 100], 'div-gpt-ad-1571327001291-0').addService(googletag.pubads());
  });
  googletag.cmd.push(function () {
    googletag.defineSlot('/21750020995/xs-banner1', [320, 50], 'div-gpt-ad-1571322911485-0').addService(googletag.pubads());
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
  });
