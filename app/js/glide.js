// Header slider section
if (document.getElementById('glide-header')) {
    const header = new Glide('.glide-header', {
        type: 'carousel',
        startAt: 0,
        animationDuration: 1800,
        autoplay: 5000,
        keyboard: true,
        gap: 0,
        animationTimingFunc: 'ease'
    }).mount()
}

// Clients reviews section
if (document.getElementById('glide-clients')) {
    const clients = new Glide('.glide-clients', {
        type: 'carousel',
        startAt: 0,
        animationDuration: 500,
        autoplay: 3000,
        keyboard: true,
        gap: 30,
        animationTimingFunc: 'ease',
        perView: 2.06,
        breakpoints: {
            768: {
                perView: 1,
                peek: {
                    before: 5,
                    after: 15
                },
            }
        }
    }).mount();
}

// Portfolio section
if (document.getElementById('glide-portfolio')) {
    const portfolio = new Glide('.glide-portfolio', {
        type: 'carousel',
        startAt: 0,
        animationDuration: 1000,
        autoplay: 3500,
        hoverpause: true,
        keyboard: true,
        gap: 30,
        animationTimingFunc: 'cubic-bezier(1,1,0,0)',
        perView: 3,
        breakpoints: {
            1100: {
                perView: 3,
                gap: 10,
                peek: {
                    before: 5,
                    after: 5
                },
            },
            768: {
                perView: 2,
                gap: 15,
                peek: {
                    before: 5,
                    after: 5
                },
            },
            520: {
                perView: 1,
                gap: 100,
                peek: {
                    before: 55,
                    after: 55
                },
            },
            400: {
                perView: 1,
                gap: 100,
                peek: {
                    before: 15,
                    after: 15
                },
            }
        },
    }).mount();
}

// Before section
if (document.getElementById('defore-section')) {
    const beforeAfter = new Glide('.glide__before', {
        type: 'carousel',
        startAt: 0,
        animationDuration: 1000,
        dragThreshold: false,
        swipeThreshold: false,
        // hoverpause: true,
        gap: 0,
        animationTimingFunc: 'cubic-bezier(1,1,0,0)',
    }).mount();
}


// Team section
if (document.getElementById('glide__team')) {
    const team = new Glide('.glide__team', {
        type: 'carousel',
        startAt: 0,
        animationDuration: 1000,
        swipeThreshold: true,
        dragThreshold: true,
        hoverpause: true,
        perView: 3,
        gap: 50,
        peek: {
            before: 10,
            after: 10
        },
        breakpoints: {
            992: {
                perView: 2,
                gap: 30,
                peek: {
                    before: 5,
                    after: 5
                },
            },
            576: {
                perView: 1,
                gap: 100,
                peek: {
                    before: 85,
                    after: 85
                },
            },
            420: {
                perView: 1,
                gap: 100,
                peek: {
                    before: 30,
                    after: 30
                },
            }
        },
        animationTimingFunc: 'cubic-bezier(1,1,0,0)',
    }).mount();
}


// Services glide
if (document.getElementById('services__glide')) {
    let glideServices;
    ssm.addState({
        id: "mobile",
        query: '(max-width: 767px)',
        onEnter: function () {
            glideServices = new Glide('.services__glide', {
                type: "carousel",
                startAt: 0,
                perView: 2,

                gap: 30,
                bound: true,
                breakpoints: {
                    768: {
                        perView: 1,
                        peek: {
                            before: 15,
                            after: 15
                        },
                    }
                }
            })
            glideServices.mount()
        },
        onLeave: function () {
            glideServices.destroy()
        }
    });
}


// Features glide
if (document.getElementById('glide__features')) {
    let glideFeatures;
    ssm.addState({
        id: "mobile",
        query: '(max-width: 767px)',
        onEnter: function () {
            glideFeatures = new Glide('.glide__features', {
                type: "carousel",
                startAt: 0,
                perView: 2,

                gap: 30,
                bound: true,
                breakpoints: {
                    768: {
                        perView: 1,
                        peek: {
                            before: 5,
                            after: 5
                        },
                    }
                }
            })
            glideFeatures.mount()
        },
        onLeave: function () {
            glideFeatures.destroy()
        }
    });
}

// glide__traffic
if (document.getElementById('glide__traffic')) {
    new Glide('.glide__traffic', {
        type: 'carousel',
        startAt: 0,
        animationDuration: 1000,
        swipeThreshold: true,
        dragThreshold: true,
        hoverpause: true,
        perView: 3,
        gap: 20,
        peek: {
            before: 10,
            after: 10
        },
        breakpoints: {
            1100: {
                perView: 2,
                gap: 30,
                peek: {
                    before: 5,
                    after: 5
                },
            },
            700: {
                perView: 1,
                gap: 100,
                peek: {
                    before: 50,
                    after: 50
                },
            },
            420: {
                perView: 1,
                gap: 100,
                peek: {
                    before: 10,
                    after: 10
                },
            }
        },
        animationTimingFunc: 'cubic-bezier(1,1,0,0)',
    }).mount();
}



// glide__traffic-desc

if (document.getElementById('glide__traffic-desc')) {
    new Glide('.glide__traffic-desc', {
        type: 'carousel',
        startAt: 0,
        animationDuration: 1000,
        swipeThreshold: true,
        dragThreshold: true,
        hoverpause: true,
        perView: 2,
        gap: 20,
        peek: {
            before: 10,
            after: 10
        },
        breakpoints: {
            1100: {
                perView: 1,
                gap: 30,
                peek: {
                    before: 5,
                    after: 5
                },
            },
            992:{
                perView: 2,
                gap: 30,
                peek: {
                    before: 5,
                    after: 5
                },
            },
            420: {
                perView: 1,
                gap: 100,
                peek: {
                    before: 10,
                    after: 10
                },
            }
        },
        animationTimingFunc: 'cubic-bezier(1,1,0,0)',
    }).mount();
}