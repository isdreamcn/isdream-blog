export const useUserList = () => {
  return [
    {
      id: 1,
      username: 'admin',
      password: '123456',
      token: '123456789',
      user: {
        id: 1,
        username: 'admin',
        email: '123456@mock.com'
      },
      permissions: ['tableSearch'],
      // 路由
      menu: [
        {
          id: 1,
          title: '首页MockRole',
          path: '/home',
          icon: 'iconfont-shoucang'
        },
        {
          id: 2,
          path: '/about'
        },
        {
          id: 9,
          path: '/demo/link'
        },
        {
          id: 10,
          path: '/demo/show-loading'
        },
        {
          id: 3,
          path: '/demo/menu',
          children: [
            {
              id: 4,
              path: '/demo/menu/menu1',
              children: [
                {
                  id: 5,
                  path: '/demo/menu/menu1/menu11'
                }
              ]
            },
            {
              id: 6,
              path: '/demo/menu/menu2'
            }
          ]
        },
        {
          id: 7,
          path: '/system',
          children: [
            {
              id: 8,
              path: '/system/user'
            }
          ]
        }
      ]
    }
  ]
}

interface ResultPaginationOptions {
  page: number
  pageSize: number
  count?: number
}

type DataItemFn = (index: number) => any

export const resultPagination = (
  dataItemFn: DataItemFn,
  options?: ResultPaginationOptions
): Service.ResultPagination => {
  const { page = 1, pageSize = 10, count = 100 } = options || {}
  const data: any[] = []
  const start = (page - 1) * pageSize
  const end = page * pageSize > count ? count : page * pageSize

  for (let i = start + 1; i <= end; i++) {
    data.push(dataItemFn(i))
  }
  return {
    data,
    count
  }
}
