+++
date = "2016-06-01T21:11:02+08:00"
summary = "类似Bootstrap的Modal组件实现"
title = "类似Bootstrap的Modal组件实现"

+++
 
当前流行的框架Bootstrap的Modal组件风格很不错。模态框从上到下、逐渐浮现到页面前。
![modal截图](/img/content/modal/1.png)

下面是防照其样式自定义的Modal效果：
![modal截图](/img/content/modal/2.png)

以下是实现过程。

以上图修改密码的模态框为例，页面DOM结构：

	<div class="modal" id="changePwModal">
	    <div>
		<h3 class="header">修改密码<span>X</span></h3>
		<div class="content form">
		    <div><label>用户名：</label><input id="changePw-name" type="text" maxlength="30" placeholder="请输入当前账号"/></div>
		    <div><label>旧密码：</label><input id="changePw-currPw" type="password" maxlength="30" placeholder="请输入当前密码"/></div>
		    <div><label>新密码：</label><input id="changePw-newPw" type="password" maxlength="30" placeholder="请输入新的密码"/></div>
		    <div><label>新密码确认：</label><input id="changePw-repeatNewPw" type="password" maxlength="30" placeholder="请再次输入新密码"/></div>
		</div>
		<div class="footer"><span class="tip">请输入当前密码！</span><a class="ok">确定</a><a class="cancel">取消</a></div>
	    </div>
	</div>

Modal样式(scss语法)：

	div.modal{
	  display: none;
	  position: fixed;
	  left:0;
	  top:0;
	  right:0;
	  bottom:0;
	  background-color: rgba(0,0,0,0.5);
	  z-index:10;
	  opacity: 0;
	  @include transition(opacity .15s linear);
	  &>div{
	    width:600px;
	    background-color: #fff;
	    margin:12% auto 0;
	    border-radius: 4px;
	    @include ty(0 5px 15px rgba(0,0,0,.5));
	    -webkit-transition: -webkit-transform .3s ease-out;
	    -o-transition: -o-transform .3s ease-out;
	    transition: transform .3s ease-out;
	    -webkit-transform: translate(0,-25%);
	    -ms-transform: translate(0,-25%);
	    -o-transform: translate(0,-25%);
	    transform: translate(0,-25%);
	    &>h3.header{
	      height:50px;
	      line-height: 50px;
	      background-color: #293c55;
	      padding-left:20px;
	      font-size:16px;
	      color:#fff;
	      &>span{
		float: right;
		margin-right:10px;
		color:#ccc;
		&:hover{
		  cursor: pointer;
		  color:#eee;
		}
	      }
	    }
	    &>div.footer{
	      height:60px;
	      border-top:1px solid #d9d9d9;
	      text-align: right;
	      line-height:60px;
	      &>a{
		padding: 8px 22px;
		border: 1px solid #efefef;
		border-radius: 4px;
		cursor: pointer;
		margin-right:15px;
		&.cancel{
		  background-color: #f5f5f5;
		  color: #666;
		  &:hover{
		    background-color: #e9e9e9;
		  }
		}
		&.ok{
		  background-color: rgba(41, 60, 85,0.8);
		  color:#fff;
		  border-color:rgba(41, 60, 85,0.8);
		  &:hover{
		    background-color: #293c55;
		    border-color: #293c55;
		  }
		}
	      }
	      &>span.tip{
		display: none;
		float: left;
		padding-left: 20px;
		color: #ff6666;
		font-weight: bold;
		&.ok{
		  color:#00aa00;
		}
	      }
	    }
	    &>div.content.form{
	      &>div{
		margin:15px 10px;
		&>label{
		  display: inline-block;
		  width:180px;
		  text-align: right;
		}
		&>input,select{
		  padding:6px 10px;
		  width:250px;
		}
		&>select{
		  width:270px;
		  margin-left:-4px;
		}
		&>span{
		  font-weight: bold;
		  color:#ff6666;
		  margin-left:8px;
		}
	      }
	    }
	  }
	  &.active{
	    opacity: 1;
	    &>div{
	      -webkit-transform: translate(0,0);
	      -ms-transform: translate(0,0);
	      -o-transform: translate(0,0);
	      transform: translate(0,0);
	    }
	  }
	}

组件定义：

	function Modal(ele,option){
	    this.ele = ele;
	    this.option = option || {};

	    var thisModel = this;
	    var closeTag = this.ele.find("div>h3.header>span"),
		cancelBtn = this.ele.find("div>div.footer>a.cancel"),
		okBtn = this.ele.find("div>div.footer>a.ok");
	    if(closeTag[0]){
		closeTag.click(function(){ thisModel.close() });
	    }
	    if(cancelBtn[0]){
		cancelBtn.click(function(){ thisModel.close() });
	    }
	    if(okBtn[0] && option.doClickOkBtn){
		okBtn.click(function(){
		    option.doClickOkBtn();
		});
	    }

	    this.tip = this.ele.find("div>div.footer>span.tip");
	}
	Modal.prototype.show = function(){
	    this.ele.css("display","block");
	    var ele = this.ele;
	    setTimeout(function(){
		ele.addClass("active");
	    },30);
	};
	Modal.prototype.close = function(){
	    this.ele.removeClass("active");
	    var ele = this.ele;
	    setTimeout(function(){
		ele.css("display","none");
	    },500);
	};
	Modal.prototype.showTip = function(tipStr,isOk){
	    if(this.tip && this.tip[0]){
		if(tipStr) this.tip.text(tipStr);
		isOk===true ? this.tip.addClass("ok") : this.tip.removeClass("ok");
		this.tip.show();
		var tipEle = this.tip;
		setTimeout(function(){ tipEle.hide() },3000)
	    }
	};

使用示例：

	var changePwModal = new Modal($("#changePwModal"),{
		doClickOkBtn : function(){
		    if(checkChangePwFormValidate()){//校验表单
		       ///.....
		       changePwModal.showTip("修改成功！",true);
		       ///.....
		       changePwModal.close();//关闭
		    }
		}
	    });

	$("header>div.link>a:eq(0)").click(function(){//点击修改密码，modal show
		///...
		changePwModal.show();
	    });

