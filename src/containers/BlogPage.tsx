import { Button } from "antd";
import React from "react";
import { posts } from "../shared/projectData";
import { AddPostForm } from "./components/AddPostForm";
import "./BlogPage.css";
import {
  HeartOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";

const { confirm } = Modal;

export interface FormInputs {
  title: string,
  description: string
}

interface Post {
  id: number,
  title: string,
  description: string,
  liked: boolean
}

interface MyState {
  showAddForm: boolean,
  posts: Array<Post>
}

export class BlogPage extends React.Component {
  state: MyState = {
    showAddForm: false,
    posts,
  };

  handleAddFormShow() {
    this.setState({
      showAddForm: true,
    });
  }

  handleAddFormHide() {
    this.setState({
      showAddForm: false,
    });
  }

  addPost(values: FormInputs) {
    const temp = [...this.state.posts];
    const newPost: Post = {
      id: posts.length + 1,
      title: values.title,
      description: values.description,
      liked: false,
    };
    temp.push(newPost);

    this.setState((state: MyState) => {
      return { posts: [...state.posts, newPost] };
    });

    this.handleAddFormHide();
  }

  likePost(pos: number) {
    const temp = [...this.state.posts];
    temp[pos].liked = !temp[pos].liked;

    this.setState((state: MyState) => {
      return { posts: temp };
    });
  }

  deletePost(pos: number) {
    const temp = [...this.state.posts];

    const onOk = () => {
      console.log("OK");
      temp.splice(pos, 1);
      this.setState((state: MyState) => {
        return { posts: temp };
      });
    };

    confirm({
      title: "Вы хотите удалить этот пост?",
      icon: <ExclamationCircleOutlined />,
      content: "Действия необратимы",
      okText: "Да",
      okType: "danger",
      cancelText: "Нет",
      onOk,
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  render() {
    const blogPosts = this.state.posts.map((item, pos) => {
      return (
        <div key={item.id} className="post">
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <button className="likeBtn" onClick={() => this.likePost(pos)}>
            <HeartOutlined
              style={{ color: item.liked ? "crimson" : "black" }}
            />
          </button>
          <button className="likeBtn" onClick={() => this.deletePost(pos)}>
            <DeleteOutlined />
          </button>
        </div>
      );
    });
    return (
      <div className="blogPage">
        {this.state.showAddForm && (
          <AddPostForm
            handleAddFormHide={this.handleAddFormHide}
            showAddForm={this.state.showAddForm}
            addPost={this.addPost}
          />
        )}
        <h1>Simple Blog</h1>
        <div className="addNewPost">
          <Button type="primary" onClick={this.handleAddFormShow}>
            Создать новый пост
          </Button>
        </div>
        <div className="posts">{blogPosts}</div>
      </div>
    );
  }
}
