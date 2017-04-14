/**
 * Created by liudong on 2017/4/14.
 */

//添加tabs
function init_rox_tabs(tabid,_src) {
    var iframeid="iframe-"+tabid;
    var _iframe=$("#"+iframeid);
    var param=_src.split("?");
    var isExist=false;
    $(".inc-content>iframe").hide();
    if(_iframe.length){
        _iframe.show();
        isExist=true;
    }else{
        var _html="<iframe id='"+iframeid+"' src='"+_src+"' width='100%'  frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes' style='height:100%;'></iframe>";
        $(".content>.inc-content").append(_html);
    }
    //判断路径是否传入参数
    if(param[1]){
        $(".inc-tabs>ul:not(:first)").hide();
        if(isExist){
            init_select_tab(_iframe,param[1]);
        }else{      //加载完毕选中tab项
            _iframe.on('load', function() {
                init_select_tab(_iframe,param[1]);
            });
        }
    }
}

//选中iframe内对应tab项
function init_select_tab(_iframe,param) {
    var menuid=param.split("=")[1];
    var doc=$(_iframe).contents();
    $("[nodeid='tab-"+menuid+"']",doc).addClass("tab-active");
    var _href=$("[nodeid='tab-"+menuid+"']",doc).attr("href");
    $("#tab-content",doc).load(_href);
}