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
  });

  // gnb li click events
  $(".gnb > li").click(function(){
      $(this).removeClass("on");
      $(".cover").removeClass("on");
      $(".gnb").removeClass("on");
      $(".btn_open").removeClass("on");
      $(".btn_open > span").css("background","#000");
      var liTargetId = $(this).children("a").attr("href");
      // alert(targetId);
      var liTargetIdTop = $(liTargetId).offset().top;
      $("html,body").clearQueue().animate({scrollTop:liTargetIdTop},980);
      btnOpenStatus=false;
  });

  // 스크롤

  //마우스 휠 up/down 이벤트
  $(".contents > section").on("mousewheel",function(e){
      e.preventDefault();
      var E = e.originalEvent;
      delta = 1;
      if (E.detail == true) {
        //브라우저가 파이어폭스인 경우
          delta = E.detail * -40;
      }else{
        //브라우저가 크롬 익스 오페라인 경우
          delta = E.wheelDelta;
      };//브라우저의 호환성 체크하는 부분

      if(delta > 0){
        //마우스 휠을 올린경우 동작 입력
        // alert("마우스 휠 올림");
        if($(this).attr("id")=="z"){
          $("html,body").clearQueue().animate({scrollTop:0},980);
        }else{
          var targetId = "#"+$(this).prev().attr("id");
          var targetIdTop = $(targetId).offset().top;
          // console.log(targetIdTop);
          $("html,body").clearQueue().animate({scrollTop:targetIdTop},980);

        }
      }else{
        //마우스 휠을 내린경우 동작 입력
        // alert("마우스 휠 내림");
        var targetId = "#"+$(this).next().attr("id");
        var targetIdTop = $(targetId).offset().top;
        // console.log(targetIdTop);
        $("html,body").clearQueue().animate({scrollTop:targetIdTop},980);

      }
  });


// skill animation

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



// 나비
  var windowHeight = $(window).height();
  var deviceWidth = $(window).width();


  var deviceHeight = $(window).height();
  var pastX = 0;
  var pastY = 0;

  $(".bf").each(function(){
    var posX = Math.random()*deviceWidth;
    var posY = Math.random()*deviceHeight;
    var scale = Math.random();
    $(this).css({
      "display":"block",
      "left":posX,
      "top":posY,
      "transform":"scale("+scale+")"
    });
    pastX = posX;
    pastY = posY;
  });

  function getAngle(x1, y1, x2, y2) {
  	var rad = Math.atan2(y2 - y1, x2 - x1);
  	return (rad*180)/Math.PI ;
  }

  var timer = setInterval(function(){
    $(".bf").each(function(){
      var posX = Math.random()*deviceWidth;
      var posY = Math.random()*deviceHeight;
      var scale = Math.random();


      //나비
      setTimeout(function(){
        pastX = posX;
        pastY = posY;
      },500);

      $(this).css({
        "left":posX,
        "top":posY,
        "transform":"scale("+scale+")"
        // "transform":"rotate("+headDeg+"deg)"
      });

    });
  },3000);




  // pop-up 가로 스크롤
  var count = 0;
  var popupslideW = $(".popList > li").width();
    $(".popList").on("mousewheel",function(e){
        e.preventDefault();
        var E = e.originalEvent;
        delta = 0;
        if (E.detail == true) {
          //브라우저가 파이어폭스인 경우
            delta = E.detail * -40;
        }else{
          //브라우저가 크롬 익스 오페라인 경우
            delta = E.wheelDelta;
        };

        if(delta>0){
          // 마우스 췰을 올린경우 동작 입력
          count--;
          if(count < 0){
            count = 0;
          }
          $(".popList").css("left",-count*(280+popupslideW)+"px");
          // $(".popList").addClass("rot");

        }else{
          // 마우스 휠을 내린경우 동작 입력
          count++;
          if(count >6){
            count =6;
          }
          $(".popList").css("left",-count*(280+popupslideW)+"px");
          // $(".popList").addClass("rot");
        }

        return false;
      });

    //popList > li 클릭했을때 동일한 id값을 가진 popupslider 선택해서 on클래스를 붙여줌
    $('.popList > li').click(function(){
      var popIndex = $(this).attr("data-text");
      $(".popupslider").addClass("on");
      $(".popupslide > li").removeClass("on");
      $(".popupslide > li").eq(popIndex-1).addClass("on");
      count = popIndex;
      // alert(popIndex);
    });

    $(".btnoff_pop").click(function(){
      $(".popupslider").removeClass("on");
      return false; // 클릭 이벤트가 상위요소로 전달되는 것을 억제
    });



// popupslide 가로 스크롤
$(".popupslide > li").on("mousewheel",function(e){
    e.preventDefault();
    var E = e.originalEvent;
    delta = 0;
    if (E.detail == true) {
      //브라우저가 파이어폭스인 경우
        delta = E.detail * -40;
    }else{
      //브라우저가 크롬 익스 오페라인 경우
        delta = E.wheelDelta;
    };

    if(delta>0){
      // 마우스 췰을 올린경우 동작 입력
      count--;
      if(count < 0){
        count = 0;
      }
      $(".popupslide > li").removeClass("on");
      $(".popupslide > li").eq(count).addClass("on");
      $(".slider > li").eq(count+1).addClass("on")
      $(".currentBar").css("width",6.66*(count+1)+"%");

    }else{
      // 마우스 휠을 내린경우 동작 입력
      count++;
      if(count > 14){
        count = 14;
      }
      $(".popupslide > li").removeClass("on");
      $(".popupslide > li").eq(count).addClass("on");
      $(".slider > li").eq(count+1).addClass("on")
      $(".currentBar").css("width",6.66*(count+1)+"%");
    }

    return false;
  });





    // // 리스트를 클릭했을 때 활성화
    // $(".popList > li").click(function(){
    //   $(".popupslider").addClass("on");
    //   $(this).
    // })
      // $(".popList > li").removeClass("on");
      // $(this).addClass("on");

    // //클릭할때마다 조금씩 오른쪽으로 가기
    // var trainIdx = $(this).index();
    // if(trainIdx > 11){
    //   trainIdx = 11;
    // }
    // $(".banner_slide").css("left",-trainIdx*280+"px");
    // });
    //
    // // 닫기버튼 눌렀을 때
    // $(".btnClose").click(function(){
    //   $(".banner_slide > li").removeClass("on");
    //   return false; // 클릭 이벤트가 상위요소로 전달되는 것을 억제
    // });



// banner 가로 스크롤
var count = 0;
var bnSliderW = $(".banner_slide > li").width();

$(".banner_slide").on("mousewheel",function(e){
    e.preventDefault();
    var E = e.originalEvent;
    delta = 0;
    if (E.detail == true) {
      //브라우저가 파이어폭스인 경우
        delta = E.detail * -40;
    }else{
      //브라우저가 크롬 익스 오페라인 경우
        delta = E.wheelDelta;
    };

    if(delta>0){
      // 마우스 췰을 올린경우 동작 입력
      count--;
      if(count < 0){
        count = 0;
      }
      $(".banner_slide").css("left",-count*(21+bnSliderW)+"px");
    }else{
      // 마우스 휠을 내린경우 동작 입력
      count++;
      if(count > 11){
        count = 11;
      }
      $(".banner_slide").css("left",-count*(21+bnSliderW)+"px");
    }

    return false;
  });

  // 리스트를 클릭했을 때 활성화
  $(".banner_slide > li").click(function(e){
    e.preventDefault();
    $(".banner_slide > li").removeClass("on");
    $(this).addClass("on");

  //클릭할때마다 조금씩 오른쪽으로 가기

  var trainIdx = $(this).index();
  if(trainIdx > 11){
    trainIdx = 11;
  }
  // $(".banner_slide").css("left",-trainIdx*bnSliderW+"px");
  $(".banner_slide").css("left",-trainIdx*(21+bnSliderW)+"px");
  });

  // 닫기버튼 눌렀을 때
  $(".btnClose").click(function(){
    $(".banner_slide > li").removeClass("on");
    return false; // 클릭 이벤트가 상위요소로 전달되는 것을 억제
  });





//App 바로가기
  $(".btn_Custom3").click(function(e){
    e.preventDefault();
    window.open("../nagaza/login1.html","NAGAZA","width=360,height=640,resizable=no");
  });

  // popup controler
  // var count = 0;
  // $(".btnNext").click(function(e){
  //   e.preventDefault();
  //   count++;
  //   if(count > 15){
  //     count = 0;
  //   }
  //   $(".popupslide > li").removeClass("on");
  //   $(".popupslide > li").eq(count).addClass("on");
  // })
  //
  // $(".btnPrve").click(function(e){
  //   e.preventDefault();
  //   count--;
  //   if(count < 0){
  //     count = 15;
  //   }
  //   $(".popupslide > li").removeClass("on");
  //   $(".popupslide > li").eq(count).addClass("on");
  // })




  //pop-up popslider1,2 animation
  $(window).scroll(function(){

    var vH = $(window).height();
    var sTop = $(window).scrollTop();
    var cTop = sTop + vH/1.1;

    $(".popslider1").each(function(){
      if(cTop > $(this).offset().top){
        $(this).addClass("on");
      }else{
        $(this).removeClass("on");
      }
    });

    $(".popslider2").each(function(){
      if(cTop > $(this).offset().top){
        $(this).addClass("on");
      }else{
        $(this).removeClass("on");
      }
    });

    $(".banner_slider").each(function(){
      if(cTop > $(this).offset().top){
        $(this).addClass("on");
      }else{
        $(this).removeClass("on");
      }
    });

    $(".reDE").each(function(){
      if(cTop > $(this).offset().top){
        $(this).addClass("on");
      }else{
        $(this).removeClass("on");
      }
    });


  });

  // scroll click Ani
  $(".scrollAni").click(function(e){
      event.preventDefault();
     $('html ,body').clearQueue().animate({scrollTop :$(this).offset().top},980);

   });

   // arrowTop
   $(".arrowTop").click(function(e){
       event.preventDefault();
     $("html,body").clearQueue().animate({scrollTop:0},1000);
   });










});
