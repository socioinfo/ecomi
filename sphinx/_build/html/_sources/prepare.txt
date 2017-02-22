.. _prepare:

2 動作環境のインストール手順 Linux
==================================

外部レポジトリの登録
--------------------

Postgres と PostGIS を簡単にインストールするため、外部レポジトリを登録します。
両方ともバージョンがしょっちゅう変わるので、リンクが切れているときは各自調べなおしてください。

.. code-block:: bash
   :emphasize-lines: 1-2

     $ sudo yum install -y https://download.postgresql.org/pub/repos/yum/9.6/redhat/rhel-7-x86_64/pgdg-centos96-9.6-3.noarch.rpm
     $ sudo yum install -y http://ftp-srv2.kddilabs.jp/Linux/distributions/fedora/epel/6/x86_64/epel-release-6-8.noarch.rpm
     
PostgreSQL のインストール
-------------------------

先ほど登録した外部レポジトリを用いて、PostgreSQL と PostGIS をインストールします。
Postgres 9.1 以前は EOL'd releases であるため、9.2 以降が必須です。ここでは、9.6 を入れることにします。

.. code-block:: console
   :emphasize-lines: 1

     $ sudo yum install -y postgresql96-libs postgresql96 postgresql96-server

PostGIS のインストール
----------------------

レポジトリより PostGIS 2 系と関連パッケージをインストールします。

.. code-block:: console
   :emphasize-lines: 1-4

   $ sudo yum install -y proj proj-epsg
   $ sudo yum install -y gdal
   $ sudo yum install -y geos
   $ sudo yum install -y postgis2_96-client postgis2_96-utils postgis2_96

次に、PostgreSQL 内に PostGIS 関連の関数を構築します。 インストール手順書 2.1 にある **redhat-el6.tar.gz**
がそのファイルで、圧縮されているので展開します。

.. code-block:: console
   :emphasize-lines: 1-3

   $ tar xvfz redhat-el6.tar.gz
   $ cd redhat-el6
   $ ls
   install_yum_postgresql.sh pg_hba.conf  postgis_proj4text_patch.sql

install_yum_postgresql.sh は、PostgreSQL 9.6 を使うにあたって書き換えます。

.. code-block:: console
   :emphasize-lines: 1,3-4

   $ ls
   install_yum_postgresql.sh pg_hba.conf  postgis_proj4text_patch.sql
   $ mv install_yum_postgresql.sh install_yum_postgresql.sh.orig
   $ vi install_yum_postgresql.sh

vi が立ち上がったら **:set paste** としてコピペ対応とします。そして **i** で書き込みモードにして以下コピペします。
コピペしたら Esc で編集モードに戻り **:wq** Enter で書き込み、終了します。

.. highlight:: bash
   :linenothreshold: 5

install_yum_postgresql.sh::

     #!/bin/sh
     #
     # Auto Install
     #
     # rpm -ivh http://yum.postgresql.org/9.1/redhat/rhel-6-x86_64/pgdg-centos91-9.1-4.noarch.rpm
     #
     
     #yum -y --skip-broken install postgresql91*
     #yum -y update postgresql91*
     #yum -y install geos*
     #yum -y install proj*
     #yum -y install postgis91
     #yum -y install postgis91-*
     
     /sbin/service postgresql-9.6 initdb
     /bin/cp -f /var/lib/pgsql/9.6/data/pg_hba.conf /var/lib/pgsql/9.6/data/pg_hba.conf.bak
     /bin/cp -f ./pg_hba.conf /var/lib/pgsql/9.6/data/pg_hba.conf
     
     sleep 5
     
     /sbin/service postgresql-9.6 restart
     
     sleep 20
     
     psql -U postgres -d template1 -f /usr/pgsql-9.6/share/contrib/postgis-2.3/postgis.sql
     psql -U postgres -d template1 -f /usr/pgsql-9.6/share/contrib/postgis-2.3/spatial_ref_sys.sql
     psql -U postgres -d template1 -f postgis_proj4text_patch.sql
     
     echo "SELECT postgis_version();" | psql -U postgres template1
     
     /sbin/chkconfig postgresql-9.6 on

コピペ完了したら実行します。

.. code-block:: console
   :emphasize-lines: 1

   $ sudo sh install_yum_postgresql.sh

最後にこのように表示されたら PostGIS のインストールは成功です。

.. code-block:: postgres-console
   
                postgis_version
   ---------------------------------------
   2.3 USE_GEOS=1 USE_PROJ=1 USE_STATS=1
   (1 行)

Java のインストール
--------------------

Java7 実行環境の `ダウンロードはここからです <http://www.oracle.com/technetwork/java/javase/downloads/java-archive-downloads-javase7-521261.html#jdk-7u80-oth-JPR>`_ 。
リンクはしょっちゅうかわるのでそのときは **Java SE Development Kit 7u80 download** をキーワードにして検索してください。

**Java SE Development Kit 7u80** の下にある **Accept License Agreement** の左側のラジオボタンを
クリックすると、ダウンロードできるようになりますので、 **jdk-7u80-linux-x64.rpm** をクリックします。
次に、 **サインイン** の画面が出るので、Oracleプロファイルのユーザー名とパスワードを
入力すると、ようやくダウンロードが始まります。
Oracleプロファイルをお持ちでない場合、右の **Oracleプロファイルをお持ちでない場合**
をクリックしてアカウントを作成してください（無料です）。 

ダウンロードが完了したらインストールします。

.. code-block:: console
   :emphasize-lines: 1
                  
   $ sudo yum install -y jdk-7u80-linux-x64.rpm

困ったことに、Java には様々なバージョンがあり、Linux 上には java コマンドが今インストールした
7u80 も含めて 3 種類くらいあるはずです。3 種類あるうち、指定されている 7u80 が最優先で動くように設定変更します。
最後の 170080 は優先順位で、 Java build 1.7.0 の update 80 という語呂合わせで適当に作っています。
数字が大きいほど **alternatives --config java** 表示時に下にくるようです。

.. code-block:: console
   :emphasize-lines: 1-2,12

   $ sudo alternatives --install /usr/bin/java java /usr/java/jdk1.7.0_80/bin/java 1700080
   $ sudo alternatives --config java
   
   3 プログラムがあり 'java' を提供します。
   
                選択       コマンド
   -----------------------------------------------
      1           /usr/lib/jvm/jre-1.5.0-gcj/bin/java
   *+ 2           /usr/lib/jvm/jre-1.8.0-openjdk.x86_64/bin/java
      3           /usr/java/jdk1.7.0_80/bin/java

   Enter を押して現在の選択 [+] を保持するか、選択番号を入力します:3

上では数字の Java7 を選んで（/usr/java/jdk1.7.0_80/bin/java） **3** を入力するわけですが、
下のように 2 種類になる可能性もあるので、そのときは **2** を選択します。

.. code-block:: console
   :emphasize-lines: 1,10

   $ sudo alternatives --config java
   
   2 プログラムがあり 'java' を提供します。
   
                選択       コマンド
   -----------------------------------------------
   *+ 1           /usr/lib/jvm/jre-1.5.0-gcj/bin/java
      2           /usr/java/jdk1.7.0_80/bin/java

   Enter を押して現在の選択 [+] を保持するか、選択番号を入力します:2

幸いにもいままで Java がインストールされていなかったら **1** です。

.. code-block:: console
   :emphasize-lines: 1,9

   $ sudo sudo alternatives --config java

   1 プログラムがあり 'java' を提供します。

   選択       コマンド
   -----------------------------------------------
   *+ 1           /usr/java/jdk1.7.0_80/bin/java

   Enter を押して現在の選択 [+] を保持するか、選択番号を入力します:1

最後にバージョンを確認します。 **1.7.0_80** が表示されていればうまくいっています。

.. code-block:: console
   :emphasize-lines: 1

   $ java -version
   java version "1.7.0_80"
   Java(TM) SE Runtime Environment (build 1.7.0_80-b15)
   Java HotSpot(TM) 64-Bit Server VM (build 24.80-b11, mixed mode)
