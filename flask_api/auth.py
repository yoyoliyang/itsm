import os
import click
from flask import Flask, session, request, current_app
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

# 传递reactjs生成的build目录为根目录
app = Flask(__name__, static_folder="../build", static_url_path='/')
# 启用CORS跨域
CORS(app)
app.config['SECRET_KEY'] = 'dev'
app.config['MONGO_URI'] = os.getenv('MONGO_URI')


@app.cli.command('init-db')
def init_db():
    '''初始化数据库'''
    with MongoClient(os.getenv('MONGO_URI')) as c:
        click.echo('清理数据库并创建管理员账户admin:admin')
        c.drop_database('itsm')
        # 插入管理员用户
        c.itsm.user.insert_one({
            'username': 'admin',
            'email': 'admin@admin',
            'password': generate_password_hash('admin')
        })


@app.route('/auth', methods=("GET", "POST"))
def login():
    if request.method == "POST":
        # 用get的方式不会显示抛出异常，检测bug可用[]方式取字典值
        username = request.form.get('username')
        password = request.form.get('password')
        # remember_me = request.form.get('rememberMe')
        with MongoClient(current_app.config.get('MONGO_URI')) as c:
            login_user = c.itsm.user.find_one({'username': username})
            if login_user:
                # 数据库密码和登录密码对比
                if check_password_hash(login_user.get('password'), password):
                    # if remember_me:
                    session['username'] = login_user.get('username')
                    # flash('登陆成功', 'success')
                    return {
                        'loginStatus': 'suc',
                        'loginUser': session.get('username')
                    }

            else:
                print('...', request.form)
                return {
                    'loginStatus': 'err',
                    'loginUser': session.get('username')
                }
    return {
        'loginStatus': 'err',
        'loginUser': session.get('username')
    }
