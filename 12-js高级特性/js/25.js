/**
 * Created by qqq on 2018/11/14.
 */
(function (window) {
    function Tab(config) {
        this.menus = null;
        this.mains = null;
        this.timer = null;
        if(config){
            this.init(config);
        }
    }
    Tab.prototype={
        constructor:Tab,
        init:function (config) {
            this.initElements(config);
            this.initEvent(config);
            if(config.auto){
                this.autoPlay();
            }
        },
        initElements:function (config) {
            var tabMenu = document.getElementById(config.tabMenu);
            var tabMain = document.getElementById(config.tabMain);

            this.menus = tabMenu.children;
            this.mains = tabMain.children;
        },
        initEvent:function (config) {
            for (var i = 0; i < this.menus.length; i++) {
                var menu = this.menus[i];
                menu.index  = i;
                var that = this;
                menu.onclick = function () {
                    if(config.auto){
                        clearInterval(that.timer);
                    }
                    that.change(this);
                    if(config.auto){
                        that.autoPlay(this.index);
                    }
                }
            }
        },
        change:function (menu) {
            for (var i = 0; i < this.menus.length; i++) {
                this.menus[i].className='tab_item';
                this.mains[i].className='main';
            }
            menu.className+=' active';
            this.mains[menu.index].className+=' selected';
        },
        autoPlay:function (index) {
            var index = index||0;
            var _this=this;
            _this.timer = setInterval(function () {
                index++;
                if(index>=_this.menus.length){
                    index = 0;
                }
                _this.change(_this.menus[index]);
            },2000);
        }
    }

    window.Tab = Tab;
})(window);
