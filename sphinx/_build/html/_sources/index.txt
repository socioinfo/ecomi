.. ecomi documentation master file, created by
   sphinx-quickstart on Sun Jan  8 20:33:39 2017.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

===================================
 Welcome to ecomi's documentation!
===================================
Contents:

.. toctree::
   :maxdepth: 2

* :ref:`virtualbox`
* :ref:`prepare`
* :ref:`install`

表記の注意点
============

コマンドを打ち込まない行は **黄色っぽい色** で示されています。黄色でない箇所はコマンドを
打ち込んだ結果の応答です。黄色っぽい色の行は、（一部選択子を選ぶ箇所は例外ですが）
行頭 **#** か **$** で始まります。 **#** **$** とその次の **半角スペース** は入力する
必要はありません。 **#** **$** の意味ですが、 **#** は root での作業、
**$** は一般ユーザーの作業です。 Unix でも Windows でもそうですが、普段作業する
ユーザー（以下 **一般ユーザ** ーといいます）となんでもできる **特権ユーザー** は別扱いにし、
一般ユーザーは中身を変更したり、消されたりすると OS とかアプリケーションに影響が出る
ファイルは弄ることを禁止したり、他の困ったことが起きかねないコマンドの実行はできなく
なっています。

ということで、以下インストール完了までに、 **#** でコマンドを打ち込む箇所は、
特権ユーザーでの作業なのでこころして行ってください。

特権ユーザーへの昇格
--------------------

恒久的な昇格
~~~~~~~~~~~~~~~~~~~~

恒久的な昇格は一般ユーザーから **sudo su** で昇格します。今回は一般ユーザー名
として admin を用意しています。 yourpassword は、 admin でログインするときに用いる
パスワードと同一です。

.. code-block:: console
   :emphasize-lines: 1-3

   $ sudo su ← 最初の文字が $ なので一般ユーザー（黄色なので sudo su を入力）
   [sudo] password for admin:yourpassword （黄色であるが admin のパスワードだけ入力）
   # exit ← 最初の文字が # なので特権ユーザー（黄色なので exit を入力）
   $ ← exit で特権ユーザーを抜ける、つまり一般ユーザーに戻った（入力しない）

一時的な昇格
~~~~~~~~~~~~

恒久的な昇格で作業を行うととかく間違いやすいもので、できれば特権ユーザーでの作業は
必要最小限としたいものです。**sudo** に続けて特権ユーザーで実行したいコマンド
を続けると、一回限りで特権ユーザーで実行します。 yum コマンドは、アプリケーションを
入れるコマンドなので、特権ユーザーでないと実行できません。

.. code-block:: console
   :emphasize-lines: 1

     $ sudo yum install -y postgresql96-libs postgresql96 postgresql96-server （入力）
     -- いろいろでるけど省略 --
     $ ← yum の処理が終わったら一般ユーザーに戻っている（入力ナシ）

すなわち、以下と同じです。

.. code-block:: console
   :emphasize-lines: 1-3,5

   $ sudo su （入力）
   [sudo] password for admin:yourpassword （パスワードだけ入力）
   # yum install -y postgresql96-libs postgresql96 postgresql96-server （入力）
   -- いろいろでるけど省略 --
   # exit （入力）
   $ （入力ナシ）

間違えないし sudo をつけるのは面倒なので恒久的な昇格で結構と思われるかもしれませんが、
そうはいっても間違えるし、もう一つの大きな理由として、 sudo の一時的な昇格でコマンドを
実行すると、誰が sudo で何を行ったのかが記録に残ります。一方、恒久的な
昇格は、何を行ったのかはそのままでは記録に残りません。
他の仕組みで残せたとしても実行者は全部 root になるので個人を特定することができなくなります。
この **作業ログが残る** という観点でも、 sudo での一時的な昇格が推奨されています。

root での作業?
~~~~~~~~~~~~~~

特権ユーザーの名前は root というので、以下のような言い回しがされます。

* root になる → sudo su で恒久的な昇格
* このコマンドは root で実行する必要があります → sudo + コマンド、または root になってから作業
* このコマンドは root でなくても実行できます。 → 一般ユーザーでも実行できる

