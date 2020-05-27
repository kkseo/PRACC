var owl;
$(document).ready(function () {
    $("#owl-example").owlCarousel(
        {
            navigation: true,
            afterAction: owlAddon.afterAction,
            slideSpeed: 1000,
            paginationSpeed: 1500,
            rewindSpeed: 400,
            singleItem: true,
            pagination: false,
            autoPlay: 10000
        });
    owl = $(".owl-carousel").data('owlCarousel');
    $(".flexnav").flexNav({ 'calcItemWidths': false, 'hoverIntent': true, 'hoverIntentTimeout': 200 });
});

var owlAddon = {
    contHeight: 0,
    afterMove: function (d) {
        alert(owl.currentItem);
        alert(owl.currentItem + " " + $(".owl-item :nth-child(" + owl.currentItem + ")").css("background-color"));
        setTimeout(function () { $("#adRotator").toggleClass("adSelected").css({ "background-color": $(".adRotItem:eq(" + owl.currentItem + ")").css("background-color") }) }, d);
    },
    afterAction: function () {
        var cOwlItem = this.owl.currentItem;
        var cAdvert = $('.adRotItem:eq(' + cOwlItem + ')');
        var adColor = "";
        if (cAdvert.hasClass('Theatre')) {
            adColor = "adEventTheatre";
        } else if (cAdvert.hasClass('Celebrations')) {
            adColor = "adCelebrationsParent";
        } else if (cAdvert.hasClass('Corporate')) {
            adColor = "adCorporateParent";
        } else if (cAdvert.hasClass('Gallery')) {
            adColor = "adGalleryParent";
        } else {
            adColor = "adEventParent";
        }
        $('#adRotator').removeClass("adEventParent");
        $('#adRotator').removeClass("adCelebrationsParent");
        $('#adRotator').removeClass("adCorporateParent");
        $('#adRotator').removeClass("adGalleryParent");
        $('#adRotator').addClass(adColor);

    }
}


