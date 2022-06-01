import React from "react";
import "./AddPostForm.css";

import { Form, Input, Button, Modal } from "antd";
import { FormInputs } from "../BlogPage";

interface MyProps {
  handleAddFormHide: () => void,
  addPost: (values: FormInputs) => void,
  showAddForm: boolean
}

export class AddPostForm extends React.Component<MyProps> {
  render() {
    return (
      <div className="addPostForm">
        <Modal
          title="Новый пост"
          visible={this.props.showAddForm}
          onCancel={this.props.handleAddFormHide}
          footer={false}
        >
          <Form onFinish={this.props.addPost} initialValues={{ title: '', description: '' }}>
            <Form.Item
              name="title"
              label="Заголовок"
              rules={[{ required: true, message: "Введите название поста" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Описание"
              rules={[{ required: true, message: "Введите описание поста" }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Добавить
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
