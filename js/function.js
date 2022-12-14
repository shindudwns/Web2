$(document).ready(function(){
  // loding animation
  setTimeout(function(){
    $(".loding").addClass("hide");
    $(".btn_open").css("opacity","1");
  },3000);
 //  메뉴버튼을 눌렀을 때
 var btnOpenStatus = false; //처음 상태 off

 $(".btn_open").click(function(){
   if(btnOpenStatus == false){
     //버튼이 비활성화 되어있는 경우
     // 1. 삼선 -> X모양으로 바뀌는 기능
     $(this).addClass("on");
     $(".cover").addClass("on");
     $(".gnb").addClass("on");
     $(".btn_open > span").css("background","#fff");
     btnOpenStatus = true;
   }else{
     // 버튼이 활성화 되어있는 경우
     // X모양 -> 삼선모양으로 바뀌는 기능
     $(this).removeClass("on");
     $(".cover").removeClass("on");
     $(".gnb").removeClass("on");
     $(".btn_open > span").css("background","#000");
     btnOpenStatus = false;
   }
 });});



$(function(){
  $(window).on('load',function(){
    new WOW().init();
  });
});//wow plugin 초기화
//팝업창
var getCookie = function (cname) {
var name = cname + "=";
var ca = document.cookie.split(';');
for(var i=0; i<ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
}
return "";
}
// 24시간 기준 쿠키 설정하기  
var setCookie = function (cname, cvalue, exdays) {
var todayDate = new Date();
todayDate.setTime(todayDate.getTime() + (exdays*24*60*60*1000));    
var expires = "expires=" + todayDate.toUTCString();
document.cookie = cname + "=" + cvalue + "; " + expires;
}

var couponClose = function(){
if($("input[id='check']").is(":checked") == true){
    setCookie("close","Y",1);   //기간( ex. 1은 하루, 7은 일주일)
}
$(".popup").hide();
}

$(document).ready(function(){
cookiedata = document.cookie;
console.log(cookiedata);
if(cookiedata.indexOf("close=Y")<0){
    $(".popup").show();
}else{
    $(".popup").hide();
}
$(".close").click(function(){
    couponClose();
});
});
$(function(){
  //var
  var $header = $('header');
  var $mnu = $('header>.container>nav>.gnb>li>a');
  var $tag = $('#aboutme>.content1-right>.tag>ul>li>a');
  var scrollTop = 0;
  var nowIdx = 0;
  var arrTopVal = [];

  $('section').each(function(idx){
    arrTopVal[idx] = $(this).offset().top;
  });

  //header
  $mnu.on('click',function(event){
    event.preventDefault();
    nowIdx = $mnu.index(this);

    $mnu.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
    $('html,body').stop().animate({
      scrollTop : arrTopVal[nowIdx]
    },500,'easeInOutCubic');
  });

  $(window).on('scroll',function(){
    scrollTop = $(this).scrollTop();

    if(scrollTop>arrTopVal[0]){
      $header.addClass('active');
    }else{
      $header.removeClass('active');
    }

    for(var i=0; i<6; i++){
      if(scrollTop>=arrTopVal[i]){ 
        $mnu.eq(i).parent().addClass('on').siblings().removeClass('on');
      }
    }
  });//end of header ecent

  //tag
  $tag.on('click',function(event){
    tagIdx = $(this).attr('href');

    if(tagIdx=='sub.html'){
      $('#aboutme>.content1-left>a').trigger("click");

    }else{
      event.preventDefault();

      $('html,body').stop().animate({
        scrollTop : arrTopVal[tagIdx]
      },500,'easeInOutCubic');
    }
  });

});//end of header handler

$(function(){
  //var
  var $mePrev = $('#aboutme>.content1-right>.profile>.prev');
  var $meNext = $('#aboutme>.content1-right>.profile>.next');
  var $aboutme = $('#aboutme>.content1-right>.profile>ul>li');
  var $tag = $('#aboutme>.content1-right>.tag>ul>li');

  var $list = $('#portfolio>.container>.mnu>li>a');
  var $listImg = $('#portfolio>.container>.view>li');
  var $viewOpen = $('.viewOpen');
  var $viewClose = $('.viewClose');
  var $viewImg = $('#portfolio>.portfolio_bg>.portfolio_img');
  var $view = $('#portfolio>.portfolio_bg');

  var $dePrev = $('#design>.prev');
  var $deNext = $('#design>.next');
  var $design = $('#design>.container>ul');
  var $designs = $('#design>.container>ul>li');
  var $gallOpen = $('.gallOpen');
  var $gallClose = $('.gallClose');
  var $gall = $('#design>.gallery_bg');
  var $gallImg = $('#design>.gallery_bg>.gallery_img');

  var nowIdx = 0;

  //about me
  $mePrev.on('click',function(){
    if(nowIdx>0){
      nowIdx--;
      $mePrev.addClass('on');
    }else{
      $mePrev.removeClass('on');
      $meNext.addClass('on');
    }

    $aboutme.eq(nowIdx).fadeIn().siblings().fadeOut();
  });

  $meNext.on('click',function(){
    if(nowIdx<2){
      nowIdx++;
      $meNext.addClass('on');
    }else{
      nowIdx = 2;
      $meNext.removeClass('on');
      $mePrev.addClass('on');
    }

    $aboutme.eq(nowIdx).fadeIn().siblings().fadeOut();
  });

  //aboutme random tag
  $(window).on('load',function(){
    var randNum = Math.floor(Math.random()*9);
    $tag.eq(randNum).addClass('on').siblings().removeClass('on');
  });//end of about me


// skill animation
$(document).ready(function(){
var statusChart = false;

function chartAni(){
   $('.chart').each(function(){
    var $chart = $(this),
            // "마스크"를 저장하고 각도 0으로 지정
            $cLeft = $chart.find('.Lmskin').css({ transform: 'rotate(0)' }),
            $cRight = $chart.find('.Rmskin').css({ transform: 'rotate(0)' }),
            // 백분율 값을 취득
            $pNumber = $chart.find('.pnum'),
            pData = $pNumber.text();

        $pNumber.text(0);

        // 각도 애니메이션
        $({ percent: 0 }).clearQueue().animate({ percent: pData }, {
            duration: 2000, //animate 옵션 duration,progress
            progress: function () {
                var now = this.percent;
                    deg = now * 360 / 100;
                    degRight = Math.min(Math.max(deg, 0), 180);
                    console.log(degRight)
                    degLeft  = Math.min(Math.max(deg - 180, 0), 180);
                $cRight.css({ transform: 'rotate(' + degRight + 'deg)' });
                $cLeft.css({ transform: 'rotate(' + degLeft + 'deg)' });
                $pNumber.text(Math.floor(now));
            }
        });
    });
    return true;
}

//skill chart
$(window).scroll(function(){
  var sTop = $(this).scrollTop();
  // console.log(sTop);
  var percent = sTop/windowHeight*100;
  $(".parallax").css("height",(100 - percent)+"vh");
  var bTop = $("#b").offset().top;
  var bHeight = $("#b").height();

  if(sTop >= bTop && sTop < bTop+bHeight){
    if(statusChart == false){
      statusChart = chartAni();
    }
  }else{
    if(statusChart == true){
      statusChart = false;
    }
  }
});
});





  //portfolio
  $list.on('click',function(event){
    event.preventDefault();
    nowIdx = $list.index(this);

    $list.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');

    $listImg.fadeOut();
    $listImg.eq(nowIdx).fadeIn();
  });


  $viewOpen.on('click',function(event){

    event.preventDefault();
    var src = $(this).attr('href');

    $viewImg.find('a').css({
      backgroundImage : 'url('+src+')'
    });

    $viewImg.parent().fadeIn();
  });

  $viewClose.on('click',function(event){
    event.preventDefault();
    $viewImg.scrollTop(0)
    $view.fadeOut();
  });
  
  $view.on('click',function(){
    $viewImg.scrollTop(0)
    $view.fadeOut();
  });
  //end of portfolio

  //design
  function galleryMove(){
    $designs.eq(nowIdx).stop().animate({left:0,},500,function(){
      $designs.eq(nowIdx).siblings().css({'left':'990px'}).appendTo($design);
    });
  }

  $dePrev.on('click',function(){
    if(nowIdx>0){
      nowIdx--;
    }else{
      nowIdx = 2;
    }

    galleryMove();
  });

  $deNext.on('click',function(){
    if(nowIdx<2){
      nowIdx++;
    }else{
      nowIdx = 0 ;
    }

    galleryMove();
  });

  $gallOpen.on('click',function(event){
    event.preventDefault();
    var src = $(this).attr('href');

    $gallImg.css({
      backgroundImage : 'url('+src+')'
    }).parent().fadeIn();
  });

  $gallClose.on('click',function(event){
    event.preventDefault();
    $gall.fadeOut();
  });

  $gall.on('click',function(){
    $gall.fadeOut();
  });//end of design
});//end of section handler
