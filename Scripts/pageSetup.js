function GetURLParameter(link, sParam) {
    var sPageURL = link.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

// fix missing functionality
if (!document.getElementsByClassName) {
    document.getElementsByClassName = function (cn) {
        var rx = new RegExp("(?:^|\\s)" + cn + "(?:$|\\s)");
        var allT = document.getElementsByTagName("*"), allCN = [], ac = "", i = 0, a;
        while (a = allT[i = i + 1]) {
            ac = a.className;
            if (ac && ac.indexOf(cn) !== -1) {
                if (ac === cn) { allCN[allCN.length] = a; continue; }
                rx.test(ac) ? (allCN[allCN.length] = a) : 0;
            }
        }
        return allCN;
    }
}

var videos = $('a[href*="youtube.com"]');

for (var i = 0; i < videos.length; i++) {
    var youtube = videos[i];
    // Create an iFrame with autoplay set to true
    var vDiv = document.createElement("div");
    vDiv.className = "video-container";
    var iframe = document.createElement("iframe");
    iframe.setAttribute("src", "https://www.youtube.com/embed/" + GetURLParameter(youtube, 'v') + "?autoplay=0&autohide=1&border=0&wmode=opaque&enablejsapi=1");
    // The height and width of the iFrame should be the same as parent
    //iframe.style.width  = "100%"; //iframe.style.height = "auto";
    youtube.innerHTML = "";
    vDiv.appendChild(iframe);
    youtube.appendChild(vDiv);
}

if (typeof jQuery != 'undefined') {
    var filetypes = /\.(zip|exe|dmg|pdf|doc.*|xls.*|ppt.*|mp3|txt|rar|wma|mov|avi|wmv|flv|wav)$/i;
    var baseHref = '';
    if (jQuery('base').attr('href') != undefined) baseHref = jQuery('base').attr('href');
    var hrefRedirect = '';
 
    jQuery('body').on('click', 'a', function(event) {
        var el = jQuery(this);
        var track = true;
        var href = (typeof(el.attr('href')) != 'undefined' ) ? el.attr('href') : '';
        var isThisDomain = href.match(document.domain.split('.').reverse()[1] + '.' + document.domain.split('.').reverse()[0]);
        if (!href.match(/^javascript:/i)) {
            var elEv = []; elEv.value=0, elEv.non_i=false;
            if (href.match(/^mailto\:/i)) {
                elEv.category = 'email';
                elEv.action = 'click';
                elEv.label = href.replace(/^mailto\:/i, '');
                elEv.loc = href;
            }
            else if (href.match(filetypes)) {
                var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined;
                elEv.category = 'download';
                elEv.action = 'click-' + extension[0];
                elEv.label = href.replace(/ /g,'-');
                elEv.loc = baseHref + href;
            }
            else if (href.match(/^https?\:/i) && !isThisDomain) {
                elEv.category = 'external';
                elEv.action = 'click';
                elEv.label = href.replace(/^https?\:\/\//i, '');
                elEv.non_i = true;
                elEv.loc = href;
            }
            else if (href.match(/^tel\:/i)) {
                elEv.category = 'telephone';
                elEv.action = 'click';
                elEv.label = href.replace(/^tel\:/i, '');
                elEv.loc = href;
            }
            else track = false;
 
            if (track) {
                var ret = true;
                if((elEv.category == 'external' || elEv.category == 'download') && (el.attr('target') == undefined || el.attr('target').toLowerCase() != '_blank') ) {
                    hrefRedirect = elEv.loc;
                    ga('send','event', elEv.category.toLowerCase(),elEv.action.toLowerCase(),elEv.label.toLowerCase(),elEv.value,{
                        'nonInteraction': elEv.non_i ,
                        'hitCallback':gaHitCallbackHandler
                    });
                    ret = false;
                }
                else {
                    ga('send','event', elEv.category.toLowerCase(),elEv.action.toLowerCase(),elEv.label.toLowerCase(),elEv.value,{
                        'nonInteraction': elEv.non_i
                    });
                }
                return ret;
            }
        }
    });
 
    gaHitCallbackHandler = function() {
        window.location.href = hrefRedirect;
    }
}