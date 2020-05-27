// JavaScript Document
if (!document.getElementsByClassName) {
	document.getElementsByClassName = function (cn) { 
		var rx = new RegExp("(?:^|\\s)" + cn+ "(?:$|\\s)");
		var allT = document.getElementsByTagName("*"), allCN = [],ac="", i = 0, a;
			while (a = allT[i=i+1]) {
			  ac=a.className;
			  if ( ac && ac.indexOf(cn) !==-1) {
				if(ac===cn){ allCN[allCN.length] = a; continue;   }
				rx.test(ac) ? (allCN[allCN.length] = a) : 0;
			  }
			}
		return allCN;
	}
}

var videos = $('a[href*="youtube.com"]');

//document.getElementsByClassName("youtube");
 
for (var i=0; i<videos.length; i++) {
	var youtube = videos[i];

    alert
    // Create an iFrame with autoplay set to true
    var vDiv = document.createElement("div");
    vDiv.className = "video-container";

    var iframe = document.createElement("iframe");
    iframe.setAttribute("src", "https://www.youtube.com/embed/" + GetURLParameter(youtube,'v') + "?autoplay=0&autohide=1&border=0&wmode=opaque&enablejsapi=1"); 
    // The height and width of the iFrame should be the same as parent
    //iframe.style.width  = "100%";
    //iframe.style.height = "auto";

    youtube.innerHTML = "";

    vDiv.appendChild(iframe);
    youtube.appendChild(vDiv);
}

function GetURLParameter(link,sParam)
{
    var sPageURL = link.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}