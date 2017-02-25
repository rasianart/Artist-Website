$(document).ready(function() {

    let sites = ['tinymixtapes.com',
        'internetpoetry.co.uk',
        'acloserlisten.com',
        'www.e-flux.com',
        'adhoc.fm',
        'contemporaryartblogs.com',
        'www.gorillavsbear.net',
        'art.newcity.com',
        'www.residentadvisor.net',
        'rhizome.org',
        'reviews.headphonecommute.com',
        'www.contemporaryartdaily.com',
        'www.dummymag.com',
        'badatsports.com',
        'www.secretdecoder.net',
        'dailyserving.com'
    ];
    let siteNames = ['Tiny Mix Tapes',
        'Internet Poetry',
        'A Closer Listen',
        'E-Flux',
        'Ad Hoc',
        'Contemporary Art Blogs',
        'Gorilla vs Bear',
        'Art New City',
        'Resident Advisor',
        'Rhizome',
        'Headphone Commute',
        'Contemporary Art Daily',
        'Dummy Mag',
        'Bad At Sports',
        'Secret Decoder',
        'Daily Serving'
    ];

    let containerId = 'you-vid';

    let player = {
        playVideo: function(container, videoId) {
            if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
                window.onYouTubePlayerAPIReady = function() {
                    player.loadPlayer(container, videoId);
                };
                $.getScript('//www.youtube.com/player_api');
            } else {
                player.loadPlayer(container, videoId);
            }
        },
        loadPlayer: function(container, videoId) {
            window.myPlayer = new YT.Player(container, {
                playerVars: {
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0,
                    autoplay: 1
                },
                height: 200,
                width: 200,
                controls: 1,
                videoId: videoId,
            });
        },
        stopPlayer: function() {
            player.pauseVideo();
        }
    };

    $(window).resize(function() {
        if ($(window).width() < 925) {
            $('#myname').html('PATRICK<br>SEGURA');
        } else {
            $('#myname').html('PATRICK SEGURA');
        }
    });

    $('#border').mouseenter(function() {
        $('#myname').css('letter-spacing', '40px');
        $('.d-all').css('opacity', '.5');
        $('#border').css('opacity', '1');
    });
    $('#border').mouseleave(function() {
        $('#myname').css('letter-spacing', '10px');
        $('.d-all').css('opacity', '0');
        $('#border').css('opacity', '0');
    });
    $('#menu-toggle').mouseenter(function() {
        $('.header').css('opacity', '1');
    });
    $('.header').mouseleave(function() {
        $('#trigger').css('z-index', '0');
        $('.header').css('opacity', '0');
    });
    $('#trigger').mouseenter(function() {
        $('#myname').textillate({ in: {
                effect: 'flipInY'
            }
        });
        $('#trigger').css('z-index', '-1');
        $('.header').css('opacity', '1');
    });

    $('#border').on('click', function() {
        $('.left-text').css({
            'margin-left': '14.5%'
        });
        $('.right-text').css({
            'margin-right': '14.5%'
        })
    });

    let direction = "",
        oldy = 0,
        mousemovemethod = function(e) {

            if (e.pageY < oldy) {
                direction = "up";
            } else if (e.pageY > oldy) {
                direction = "down";
            }

            oldy = e.pageY;
        }

    document.onmousemove = mousemovemethod;

    $('.p-contain').mouseenter(function() {
        console.log(direction);
        if (direction === 'down') {
            $(this).animate({
                scrollTop: $('.p-contain').height()
            }, "slow");
        } else {
            $(this).animate({
                scrollTop: $('.p-contain').height() - 30
            }, "fast");
        }

    })

    let init = false;
    $('.img-portfolio').on('click', function() {

        let videoId = $(this).attr('data-id');
        if (init) {
            window.myPlayer.loadVideoById(videoId);
        } else {
            player.playVideo(containerId, videoId);
            init = true;
        }

        $('.portfolio-elements').css({
            'transition': 'all 1s ease',
            'opacity': '0'
        });
        setTimeout(() => {
            $('#you-vid').css({
                'opacity': '1',
                'z-index': '5'
            });
            $('#hide-vid').css({
                'height': '50px',
                'opacity': '1'
            })
        }, 1000);
    });

    $(document).on('click', 'button#hide-vid', function() {
        $('#you-vid').css({
            'opacity': '0',
            'z-index': '-1'
        });
        $('#hide-vid').css({
            'opacity': '0',
            'height': '0px'
        });
        setTimeout(() => {
            $('.portfolio-elements').css({
                'transition': 'all 3s ease',
                'opacity': '1',
            });
        }, 2000);

    });

    let siteNoSpace = siteNames.map((site, i) => {
        return site.replace(/\s/g, '').toLowerCase();
    });

    let marTop = 0;

    createLink();

    function createLink() {
        for (let i = 0; i < sites.length; i++) {
            let siteHolder;
            let randSide = Math.floor(Math.random() * 600) + 1;

            if (i % 2 === 0) {
                siteHolder = $('<div id="' + siteNoSpace[i] + '" class="l-links"></div').appendTo('#link-contain');
                siteHolder.css({
                    'margin-left': randSide + 'px',
                    'margin-top': marTop + 'px'
                })
                makeFour(sites[i], siteNames[i], siteNoSpace[i]);
            } else {
                siteHolder = $('<div id="' + siteNoSpace[i] + '" class="r-links"></div').appendTo('#link-contain');
                siteHolder.css({
                    'margin-right': randSide + 'px',
                    'margin-top': marTop + 'px'
                })
                makeFour(sites[i], siteNames[i], siteNoSpace[i]);
            }
            marTop += 30;
        }
    }

    function makeFour(site, siteName, siteNoSp) {
        let link;
        for (let x = 0; x < 4; x++) {
            link = $('<a class="my-links" href="http://' + site + '" target="_blank">' + siteName + '</a>').appendTo('#' + siteNoSp);
        }
    }

    $('#shuffle').on('click', function() {
        $('.r-links').each(function() {
            let randSide = Math.floor(Math.random() * 250) + 1;
            $(this).css({
                'margin-right': randSide + 'px'
            });
        });
        $('.l-links').each(function() {
            let randSide = Math.floor(Math.random() * 250) + 1;
            $(this).css({
                'margin-left': randSide + 'px'
            });
        });
    });

    $('.my-links').mouseenter(function() {
        $(this).css({
            'margin-left': '15px',
            'margin-right': '15px'
        })
    });
    $('.my-links').mouseleave(function() {
        $(this).css({
            'margin-left': '0px',
            'margin-right': '0px'
        })
    });

    // Closes the sidebar menu
    $("#menu-close").click(function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    });
    // Opens the sidebar menu
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    });
    // Scrolls to the selected menu item on the page
    $(function() {
        $('a[href*=#]:not([href=#],[data-toggle],[data-target],[data-slide])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });
    //#to-top button appears after scrolling
    var fixed = false;
    $(document).scroll(function() {
        if ($(this).scrollTop() > 250) {
            if (!fixed) {
                fixed = true;
                // $('#to-top').css({position:'fixed', display:'block'});
                $('#to-top').show("slow", function() {
                    $('#to-top').css({
                        position: 'fixed',
                        display: 'block'
                    });
                });
            }
        } else {
            if (fixed) {
                fixed = false;
                $('#to-top').hide("slow", function() {
                    $('#to-top').css({
                        display: 'none'
                    });
                });
            }
        }
    });
    // Disable Google Maps scrolling
    // See http://stackoverflow.com/a/25904582/1607849
    // Disable scroll zooming and bind back the click event
    var onMapMouseleaveHandler = function(event) {
        var that = $(this);
        that.on('click', onMapClickHandler);
        that.off('mouseleave', onMapMouseleaveHandler);
        that.find('iframe').css("pointer-events", "none");
    }
    var onMapClickHandler = function(event) {
        var that = $(this);
        // Disable the click handler until the user leaves the map area
        that.off('click', onMapClickHandler);
        // Enable scrolling zoom
        that.find('iframe').css("pointer-events", "auto");
        // Handle the mouse leave event
        that.on('mouseleave', onMapMouseleaveHandler);
    }
    // Enable map zooming with mouse scroll when the user clicks the map
    $('.map').on('click', onMapClickHandler);
});
