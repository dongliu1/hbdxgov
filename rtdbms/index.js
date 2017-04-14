/**
 * Created by liudong on 2017/4/14.
 */
$(function () {
    inc_tabs._init();
    inc_content._init();
    inc_footer._init();
});

var inc_tabs={
    _init:function () {
        $.each(inc_tabs._tab_menus,function (t, tdata) {
            var _tabid=tdata.tabid;
            var _src=_tabid+"/index.html";
            var _li="<li tabid='tab-"+_tabid+"' onclick='init_rox_tabs(\""+_tabid+"\",\""+_src+"\")'><a href='javascript:void(0)' "+(tdata.name.length==2?"style='letter-spacing:1em;'":"")+">"+tdata.name+"</a></li>";
            $("#tab-menus").append(_li);
            if(tdata.hasOwnProperty("children"))inc_tabs._init_childtabs(_tabid,tdata.children);
        });
        inc_tabs._toggle_childtabs();
    },
    _init_childtabs:function (tabid,nodedata) {
        var _html="<ul id='tab-"+tabid+"' style='display: none;position: absolute;'>";
        $.each(nodedata,function (n,ndata) {
            var _src=tabid+"/index.html?menuid="+ndata.mid;
            _html+="<li onclick='init_rox_tabs(\""+tabid+"\",\""+_src+"\")'>"+ndata.name+"</li>"
        });
        _html+="</ul>";
        $(".content>.inc-tabs").append(_html);
    },
    _toggle_childtabs:function () {
        $("#tab-menus>li").on("mouseover",function () {
            var _this=this;
            var _offset=$(_this).offset();
            var _tabid=$(_this).attr("tabid");
            var _width=$(_this).width()-2;
            $("#tab-menus>li>a").removeClass("tab-active");
            $(".inc-tabs>ul:not(:first)").hide();
            $("#"+_tabid).css({"left":_offset.left+"px","top":(_offset.top+38)+"px","min-width":_width+"px"}).show();
            event.stopPropagation();
        });
        $(".inc-tabs>ul:not(:first)").on("mouseover",function () {
           var _tabid=$(this).attr("id");
           console.log(_tabid);
           $("#tab-menus>li>a").removeClass("tab-active");
           $("[tabid='"+_tabid+"']>a").addClass("tab-active");
           event.stopPropagation();
        });
        $(document).on("mouseover",function (e) {
            $("#tab-menus>li>a").removeClass("tab-active");
            $(".inc-tabs>ul:not(:first)").hide();
        })
    },
    _tab_menus:[
        {name:"首页",tabid:"index"},
        {name:"校院概况",tabid:"page-profile",children:[
                {name:"校院简介",mid:""},
                {name:"现任领导",mid:""},
                {name:"机构设置",mid:""},
                {name:"主要职能",mid:""},
                {name:"历史沿革",mid:""}
            ]
        },
        {name:"教学工作",tabid:"page-course",children:[
                {name:"教学公告",mid:""},
                {name:"教学管理",mid:""},
                {name:"教学动态",mid:""},
                {name:"教学计划",mid:""},
                {name:"教学研究",mid:""},
                {name:"教学资料下载",mid:""}
            ]
        },
        {name:"学术科研",tabid:"page-research",children:[
                {name:"科研动态",mid:""},
                {name:"管理制度",mid:""},
                {name:"决策咨询",mid:""},
                {name:"学术成果",mid:""},
                {name:"报刊杂志",mid:""},
                {name:"科研资料下载",mid:""}
            ]
        },
        {name:"学员管理",tabid:"page-student",children:[
                {name:"学员动态",mid:""},
                {name:"学员管理",mid:""},
                {name:"学员天地",mid:""}
            ]
        },
        {name:"队伍建设",tabid:"page-teamwork",children:[
                {name:"政策法规",mid:""},
                {name:"工作动态",mid:""},
                {name:"师资队伍",mid:""},
                {name:"学科建设",mid:""}
            ]
        },
        {name:"信息化建设",tabid:"page-information",children:[
                {name:"信息化概况",mid:""},
                {name:"信息化动态",mid:""},
                {name:"规章制度",mid:""}
            ]
        },
        {name:"机关党建",tabid:"page-organ",children:[
                {name:"工作动态",mid:""},
                {name:"文件汇编",mid:""},
                {name:"党风廉政建设",mid:""},
                {name:"精神文明建设",mid:""},
                {name:"老干部工作",mid:""}
            ]
        },
        {name:"服务保障",tabid:"page-service",children:[
                {name:"规章制度",pid:"",tabid:"wsd-school"},
                {name:"工作动态",pid:"",tabid:"wsd-school"},
                {name:"社会化服务",pid:"",tabid:"wsd-school"},
                {name:"意见信箱",pid:"",tabid:"wsd-school"}
            ]
        },
        {name:"智慧校园云平台",tabid:"page-wsdSchool"}
    ]
};

var inc_content={
    _init:function () {
        init_rox_tabs("index","index/index.html");
    }
};

var inc_footer={
    _init:function () {
        $(".content>.inc-footer").load("templates/inc-footer.html");
    }
};