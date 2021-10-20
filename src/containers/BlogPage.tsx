import { Button } from "antd";
import React from "react";
import { posts } from "../shared/projectData";
import { AddPostForm } from "./components/AddPostForm";

export interface FormInputs {
  title: string,
  description: string
}

interface Post {
  id: number,
  title: string,
  description: string
}

interface MyState {
  showAddForm: boolean,
  posts: Array<Post>
}

export class BlogPage extends React.Component {
  state: MyState = {
    showAddForm: false,
    posts
  }
   
  handleAddFormShow = () => {
    this.setState({
      showAddForm: true,
    });
  };

  handleAddFormHide = () => {
    this.setState({
      showAddForm: false,
    });
  };

  addPost = (values: FormInputs) => {
    const temp = [...this.state.posts];
    const newPost: Post = {
      id: posts.length + 1,
      title: values.title,
      description: values.description,
    };
    temp.push(newPost)

    this.setState((state: MyState) => {
      return {posts: [...state.posts, newPost]};
    });

    this.handleAddFormHide()
  }

  render() {
    const blogPosts = this.state.posts.map((item) => {
      return (
        <div key={item.id} className="post">
          <h2>{item.title}</h2>
          <p>{item.description}</p>
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
    )
  }
}