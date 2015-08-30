/**
 * Created by misicdemone on 15/8/30.
 */
var restaurantOnshow = angular.module('restaurantOnshow', []);

restaurantOnshow.controller('documentsController', function($scope, $http) {


    var page = 1 //页数
        ,
        loading = false;

    $scope.nearby = [];

    var add = document.querySelector("#add");

    (function getState() {
        var url = "http://kaohe.zeroling.com/kaohe/state";
        var state2 = document.querySelector("#state2");
        var state3 = document.querySelector("#state3");
        var state4 = document.querySelector("#state4");
        var state5 = document.querySelector("#state5");
        $http({
            method: 'POST',
            url: url,
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function(response) {
            if(response.state === "1"){
                state2.style.display = "none";
                state3.style.display = "none";
                state4.style.display = "none";
                state5.style.display = "none";
            } else if(response.state === "2"){
                state2.style.display = "block";
                state3.style.display = "none";
                state4.style.display = "none";
                state5.style.display = "none";
            } else if(response.state === "3"){
                state2.style.display = "none";
                state3.style.display = "block";
                state4.style.display = "none";
                state5.style.display = "none";
            } else if(response.state === "4"){
                state2.style.display = "none";
                state3.style.display = "none";
                state4.style.display = "block";
                state5.style.display = "none";
            } else if(response.state === "5"){
                state2.style.display = "none";
                state3.style.display = "none";
                state4.style.display = "none";
                state5.style.display = "block";
            }
            console.log(response.state);
        }).error(function() {
            console.log("error");
        });
    })();

    function pushContent() {
        if (!loading) {
            loading = true;
            console.log($scope.nearby);
            var lists = document.querySelectorAll(".list");
            var url = "http://kaohe.zeroling.com/kaohe/list";
            $http({
                method: 'POST',
                url: url,
                data: {"start": lists.length, "len": 9},
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function(response) {
                for (var i = 0; i < 3; i++) {
                    (function(i){
                        console.log(i);
                        $scope.nearby.push(response.data[i]);
                        console.log(response.data[i]);
                    })(i);
                }
                loading = false;
                console.log(response.data);
            }).error(function() {
                console.log("error");
            });
            page++;
            console.log($scope.nearby);
        }
    }

    pushContent();

    add.addEventListener("click", pushContent);

    function getScrollTop(){
        var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if(document.body){
            bodyScrollTop = document.body.scrollTop;
        }
        if(document.documentElement){
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    }
    function getScrollHeight(){
        var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if(document.body){
            bodyScrollHeight = document.body.scrollHeight;
        }
        if(document.documentElement){
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
    }
    function getWindowHeight(){
        var windowHeight = 0;
        if(document.compatMode == "CSS1Compat"){
            windowHeight = document.documentElement.clientHeight;
        }else{
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    }
    window.onscroll = function(){
        if(getScrollTop() + getWindowHeight() >= getScrollHeight()){
            pushContent();
        }
    };
});



