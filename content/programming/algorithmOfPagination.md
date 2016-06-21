+++
date = "2016-06-01T21:11:02+08:00"
summary = "介绍DataTables分页器的生成算法"
title = "DataTables分页器的生成算法"

+++
jQuery有一款很好用的表格插件：[DataTables](https://www.datatables.net)，对于构建后台管理之类的CRUD应用非常方便。
![CRUD应用截图](/img/content/algorithmOfPagination/1.png)

DataTables的分页器设计的很简约，一排简单的按钮就标示出了当前页、总页数，以及首页、末页、前一页、后一页的导航。当切换页码的时候，分页器按钮上的页码标识随之而变。

观察发现，除去前一页、后一页按钮，如果总页数不大于7，则页码全部显示出来；否则，页码按钮固定7个，分别是首页和末页、当前页及当前页的左右页、中间页（用...标识）。当页码属于前4页或者末4页时，连续显示前5加末页或者后5加首页。

比如总页数29，分页器随着当前页不同而显示如下：

| 当前页  | 页码               |
| ------- |:-----------------------:|
| 1       | 1、2、3、4、5、...、29   |
| 2       | 1、2、3、4、5、...、29   |
| 3       | 1、2、3、4、5、...、29   |
| 4       | 1、2、3、4、5、...、29   |
| 5       | 1、...、4、5、6、...、29 |
| ...     | ... |
| 25       | 1、...、24、25、26、...、29 |
| 26       | 1、...、25、26、27、28、29 |
| 27       | 1、...、25、26、27、28、29 |
| 28       | 1、...、25、26、27、28、29 |
| 29       | 1、...、25、26、27、28、29 |

实现的Pagination如下：

定义dom容器：

	<div class="pagination"><div class="pages"></div></div>

Pagination的定义：

	function Pagination(ele,option){
	    this.ele = ele;//$("div.pagination")
	    this.option = option || {};
	    this.pages = ele.children("div.pages");
	    var pagObj = this;
	    pagObj.pages.on("click","a",function(){
	        if(!/disable/.test(this.className) && this.innerHTML != "..."){
	            var gotoPage = 1;//需要跳转的页码
	            if(/prev/.test(this.className)){
	                gotoPage = pagObj.currPage-1;
	            }
	            else if(/next/.test(this.className)){
	                gotoPage = pagObj.currPage+1;
	            }
	            else{
	                gotoPage = parseInt(this.innerHTML);
	            }
	            pagObj.option.switchPage(gotoPage);//回调switchPage
	         }
	    })
	}

切换页码时，传入当前页码、总页数两个参数，更新Pagination:

	Pagination.prototype.refresh = function(option){
	    this.currPage = option.currPage;//当前页
	    this.totalPage = option.totalPage;//总页数
	    var hasPrev = (option.currPage != 1), hasNext = (option.currPage != option.totalPage);
	    var htmlStr = "<a class='prev"+(hasPrev ? "" : " disable")+"'><<</a>";
	    var i;
	    if(option.totalPage<=7){
	        for(i=1;i<=option.totalPage;i++){
	            htmlStr += "<a"+(i==this.currPage ? " class='curr'" : "")+">"+i+"</a>"
	        }
	    }
	    else{
	        var posArr = [1,,,,,,option.totalPage],//存放页码
	            leftVal = option.currPage-1,
	            rightVal = option.currPage+1;
	        if(leftVal<3){
	            for(i=1;i<=4;i++) posArr[i] = i+1;
	            posArr[5] = "...";
	        }
	        else if(option.totalPage-rightVal<3){
	            for(i=5;i>=2;i--) posArr[i] = posArr[i+1]-1;
	            posArr[1]="...";
	        }
	        else{
	            posArr[1] = "...";
	            posArr[2] = leftVal;
	            posArr[3] = option.currPage;
	            posArr[4] = rightVal;
	            posArr[5] = "...";
	        }
	        for(i=0;i<posArr.length;i++){
	            htmlStr +="<a"+(posArr[i]==option.currPage ? " class='curr'" : "")+">"+posArr[i]+"</a>";
	        }
	    }
	    htmlStr +="<a class='next"+(hasNext ? "" : " disable")+"'>>></a>";
	    this.pages.html(htmlStr);
	};

使用：

	var pagination = new Pagination($("div.pagination"),{
	        switchPage : function(page){
	            console.log("switch page："+page);
	        }
	});
	pagination.refresh({ currPage : 1 , totalPage : 10});//更新显示

