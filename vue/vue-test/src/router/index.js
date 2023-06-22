import VueRouter from "vue-router";
import Home from "../pages/Home";
import About from "../pages/About";
import News from "../pages/News";
import Message from "../pages/Message";
import Detail from "../pages/Detail";

export default new VueRouter({
  routes: [
    {
      path: "/about",
      component: About,
    },
    {
      path: "/home",
      component: Home,
      children: [
        {
          path: "news",
          component: News,
        },
        {
          path: "message",
          component: Message,
          children: [
            {
              name: "xiangqing",
              path: "detail",
              component: Detail,
              // props的第一种写法，值为对象，
              // 该对象中的所有key-value都会以props的形式传给Detail组件
              // props:{a:1,b:'hello'}

              // props的第二种写法，值为布尔值，
              // 若布尔值为真，会把该路由组件收到的所有params参数，以props的形式传给Detail组件
              // props:true

              // props的第三种写法，值为函数
              props({ query }) {
                // 这里可以使用解构赋值
                return {
                  id: query.id,
                  title: query.title,
                };
              },
            },
          ],
        },
      ],
    },
  ],
});