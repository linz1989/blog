+++
date = "2016-06-20T21:01:02+08:00"
summary = "AngularJS学习笔记"
title = "AngularJS学习笔记(2)"

+++

第二章讲解的是如何构建与测试。

MongoLab为数据量在0.5GB以下的数据库提供免费寄存，提供输出JSON格式的REST接口。

构建系统准则：自动化所有事情；尽早报错，清晰报错；不同的工作流，不同的任务；构建脚本同样是代码。

AngularJS的测试代码是用Jasmine编写的。Karma runner用于执行JavaScript测试，能够分发源代码和测试代码到浏览器的运行实例上，触发测试的执行，收集输出结果。

文件命名的约定：所有JavaScript文件使用标准的.js扩展名；子模板文件的后缀是.tpl.html；测试文件和它测试的目标文件命名一致，后缀依靠测试类型不同而不同，单元测试以.spec.js结尾。

每个文件中应仅定义一个AngularJS模块，这样可以维护相对较小、目标单一的文件和模块。

angular.module('myModule')可以取回已定义的模块实例，但应避免使用。

Karma runner的测试子集：

1. 为测试或者测试套件加字母x前缀(xit、xdescribe)，将在下次运行时禁用此测试或者测试套件；
2. 为测试套件加字母d前缀(ddescribe)，将只运行次套件，而忽略其它测试套件；
3. 为测试加字母i前缀(iit)，将只运行此测试，而忽略其他测试和测试套件。

angular.mock.dump(object)在控制台打印变量值；简写dump(object)。







