import React from "react";
import "./AddPostForm.css";

import { Form, Input, Button, Modal } from "antd";

interface MyProps {
  handleAddFormHide: React.MouseEventHandler<HTMLButtonElement>,
  addPost: any,
  showAddForm: boolean
}

export class AddPostForm extends React.Component<MyProps> {
  render() {
    return (
      <div className="addPostForm">
        <Modal
          title="Новый пост"
          visible={this.props.showAddForm}
          onCancel={(e: any) => this.props.handleAddFormHide(e)}
          footer={false}
        >
          <Form onFinish={(values) => this.props.addPost(values)}>
            <Form.Item
              name="title"
              rules={[{ required: true, message: "Введите название поста" }]}
            >
              <Input placeholder="Заголовок" />
            </Form.Item>
            <Form.Item
              name="description"
              rules={[{ required: true, message: "Введите описание поста" }]}
            >
              <Input.TextArea placeholder="Описание" />
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
