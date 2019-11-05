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

  googletag.cmd.push(function () {
    googletag.defineSlot('/21750020995/square', [[300, 250], [336, 280]], 'div-gpt-ad-1538840058287-0').addService(googletag.pubads());

  });

  googletag.cmd.push(function () {
    googletag.defineSlot('/21750020995/squ-under', [[336, 280], [300, 250]], 'div-gpt-ad-1538874382517-0').addService(googletag.pubads());

  });
  googletag.cmd.push(function () {
    googletag.defineSlot('/21750020995/lg-banner', [[728, 90], [970, 90]], 'div-gpt-ad-1571325317379-0').addService(googletag.pubads());

  });

  googletag.cmd.push(function () {
    googletag.defineSlot('/21750020995/xs-banner2', [320, 100], 'div-gpt-ad-1571327001291-0').addService(googletag.pubads());
  });
  googletag.cmd.push(function () {
    googletag.defineSlot('/21750020995/xs-banner1', [320, 50], 'div-gpt-ad-1571322911485-0').addService(googletag.pubads());
    googletag.pubads().enableSingleRequest();
    googletag.pubads().collapseEmptyDivs();
    googletag.enableServices();
  });
