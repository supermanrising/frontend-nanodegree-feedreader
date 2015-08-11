/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds instanceof Array).toBeTruthy();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has defined url', function() {
            var numberOfFeeds = allFeeds.length;
            for (i = 0; i < numberOfFeeds; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).toMatch(/^http(s?)\:\/\//);
            }
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has defined name', function() {
            var numberOfFeeds = allFeeds.length;
            for (i = 0; i < numberOfFeeds; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(typeof allFeeds[i].name).toBe('string');
                expect(allFeeds[i].name).not.toBe("");
            }
        });
    });

    /* Test suite for "The menu" */
    describe('The Menu', function() {

        // define variable to check if body has `menu-hidden` class
        var menuIsHidden = $('body').hasClass('menu-hidden');

        /* This test ensures the menu element is hidden by default. */
        it('loads with hidden menu', function() {
            expect(menuIsHidden).toBe(true);
        });

        /* This test ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * has two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when the menu icon is clicked', function() {
            // define variable for menu icon DOM element
            var menuIcon = $('.menu-icon-link');
            // trigger click on menu item
            menuIcon.trigger('click');

            // update menuIsHidden variable
            menuIsHidden = $('body').hasClass('menu-hidden');
            // check if menuIsHidden is false
            expect(menuIsHidden).toBe(false);

            // trigger second click on menu icon DOM element
            menuIcon.trigger('click');

            // update menuIsHidden variable
            menuIsHidden = $('body').hasClass('menu-hidden');
            // check if menuIsHidden is true
            expect(menuIsHidden).toBe(true);
        });
    });


    /* Test suite for "Initial Entries" */
    describe('Initial Entries', function() {

        // Before each `it` function, run the loadfeed() function
        beforeEach(function(done) {
            loadFeed(0,function() {
                done();
            });
        });

        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('should have at least 1 entry', function(done) {
            // declare variable for `.entry` element within the `.feed` element
            var entry = $('.feed').has('.entry');
            // check if entry has exists
            expect(entry.length).toBeGreaterThan(0);
            done();
        });

    });

    /* Test suite for "New Feed Selection" */
    describe('New Feed Selection', function() {
        var contentBefore,      // feed entries after first loadfeed() function has been executed
            contentAfter;       // feed entries after second loadfeed() function has been executed

        beforeEach(function(done) {
            // load feed and define contentBefore variable
            loadFeed(0, function() {
                contentBefore = $('.feed').html();
                // load feed with new data and define the contentAfter variable
                loadFeed(1,function() {
                    contentAfter = $('.feed').html();
                    done();
                });
            });
        });

        /* This test ensures that when a new feed is loaded
         * by the loadFeed function the content actually changes.
         */
        it('should change when a new feed is loaded', function(done) {
            // check if contentBefore & contentAfter are different
            expect(contentBefore).not.toBe(contentAfter);
            done();
        });
    });
}());
