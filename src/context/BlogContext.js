import React, { useReducer } from "react";
import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";
const blogReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 9999),
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
    case "delete":
      return state.filter((blogPost) => {
        console.log(blogPost.id, "----", action.payload);
        return blogPost.id !== action.payload;
      });
    case "edit":
      return state.map((blogPost) => {
        if (blogPost.id === action.payload.id) {
          return action.payload;
        } else {
          return blogPost;
        }
      });
    case "get_blogposts":
      return action.payload;
    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/blogposts");

    dispatch({ type: "get_blogposts", payload: response.data });
  };
};

const addBlogPost = (dispatch) => {
  return (title, content, callback) => {
    dispatch({ type: "add", payload: { title, content } });
    callback();
  };
};

const deleteBlogPost = (dispatch) => {
  return (id) => {
    //console.log(id);
    dispatch({ type: "delete", payload: id });
  };
};

const editBlogPost = (dispatch) => {
  return (id, title, content) => {
    dispatch({
      type: "edit",
      payload: { id, title, content },
    });
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
