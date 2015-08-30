var images = [{
    src: 'images/barleyx1536.jpg',
    img: null
}, {
    src: 'images/barley_closeupx1536.jpg',
    img: null
}, {
    src: 'images/boatx1536.jpg',
    img: null
}, {
    src: 'images/grainx1536.jpg',
    img: null
}, {
    src: 'images/hillsx1536.jpg',
    img: null
}, ];

// var bg = jQuery(".image__behind, .image__infront");
// jQuery(window).resize("resizeBackground");
// function resizeBackground() {
//     bg.height(jQuery(window).height() + 60);
// }
// resizeBackground();

var Tolland = {
    imageIndex: 0,
    imageBehind: document.getElementsByClassName('image__behind')[0],
    imageInfront: document.getElementsByClassName('image__infront')[0],
    init: function(){
        // Set up link buttons
        Tolland.bindUIActions();

        // Load images and swap in high res source when that loads
        Tolland.preloadImages();

        // Set up image changing
        setInterval(Tolland.changeHeader, 5000);
    },
    bindUIActions: function(){
        // TODO Link buttons
        $('*[data-toggle="card"]').click(function () {
            var targetSelector = $(this).data('target');
            var $target = $(targetSelector);

            Tolland.animateCardContainer($target);
        });

        $('.close').click(function () {
            Tolland.animateCardContainer($('.description'));
        });
        $('.navbar-brand').click(function () {
            Tolland.animateCardContainer($('.description'));
        });
    },
    // animateCardContainer: function($targetCard){
    //     // Fade card up and out
    //     $('.card-container').removeClass('fadeInDownSmall').addClass('fadeOutUp');
    //     // Fade
    //     $('.card:not(.hidden)').addClass('fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    //         $(this).addClass('hidden');
    //     });

    //     $targetCard.removeClass('hidden fadeOut').addClass('fadeIn');
    //     setInterval(function(){
    //         $('.card-container').removeClass('fadeOutUp').addClass('fadeInDownSmall');
    //     }, 400);
    // },
    animateCardContainer: function($targetCard){
        // If the navbar on mobile is expanded, close it
        if ($('.navbar-collapse').hasClass('in'))
            $(".navbar-toggle").click();

        // Do nothing if requested card is already showing
        if ($targetCard.hasClass('active')){
            return;
        }

        // Fade out active card
        $active = $('.card.active');
        $active.removeClass('fadeInDownSmall').addClass('fadeOutUp');
        $active.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $active.removeClass('active').removeClass('fadeOutUp');
        });

        // Fade in selected card
        $targetCard.addClass('fadeInDownSmall').addClass('active');

        
        // Set up animationEnd listener so that when faded out, new content fades in
        // $('.card-container').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        //     $('.card.active').removeClass('active');
        //     $targetCard.addClass('active');
        //     // Fade back in the container
        //     $(this).removeClass('fadeOutUp');
        //     $(this).addClass('fadeInDownSmall');
        // });
        // // Fade out the container
        // $('.card-container').removeClass('fadeInDownSmall');
        // $('.card-container').addClass('fadeOutUp');
    },
    preloadImages: function(){
        images.forEach(function (thatImage) {
            // Make empty js image object
            var imgObj = new Image();

            // Create image load event listener
            imgObj.addEventListener('load', function () {
                thatImage.img = imgObj; 
                Tolland.replaceLowRes();
            });
            // Make request for image to load
            imgObj.src = thatImage.src;
        });        
    },
    replaceLowRes: function() {
        //Image load event callbacks can finish at different times. We only was the first image
        if (!images[0].img){
            return;
        }
        // If we have the high res first image loaded, swap out the low res version
        if (Tolland.imageInfront && !Tolland.imageIndex)
            Tolland.imageInfront.style.backgroundImage = 'url(\'' + images[0].src + '\')';
        if (Tolland.imageBehind && !Tolland.imageIndex)
            Tolland.imageBehind.style.backgroundImage = 'url(\'' + images[0].src + '\')';
    },
    changeHeader: function() {
        /*
            Index in incr and behind image gets new source. 
            After a wait, infront image gets faded out cause of .old which shows new image behind. 
            Transistionend listener fires so infront source is changed and .old is removed 
        */

        Tolland.imageInfront.addEventListener('transitionend', function () {
            Tolland.imageInfront.style.backgroundImage = 'url(\'' + images[Tolland.imageIndex].src + '\')';
            Tolland.imageInfront.classList.remove('old');
        });
        // Increment index
        while (images[++Tolland.imageIndex] === null);
        // Wrap index arround if it goes > length
        Tolland.imageIndex = Tolland.imageIndex % images.length;

        // Change image thats out of view and wait to make sure it's changed before fading the infront out
        Tolland.imageBehind.style.backgroundImage = 'url(\'' + images[Tolland.imageIndex].src + '\')';
        setTimeout(function () {
            Tolland.imageInfront.classList.add('old');
        }, 450);

    }
};

document.addEventListener('DOMContentLoaded', Tolland.init);