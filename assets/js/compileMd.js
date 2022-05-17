function compileMd(mkContent) {
  let nav = []
  let navLevel = []

  mkContent
    .replace(/```/g, function () {
      return '\f'
    })
    .replace(/\((.+?)\)|\[(.+?)\]|\{(.+?)\}/g, function () {
      return ''
    })
    .replace(/\f[^\f]*?\f/g, function () {
      return ''
    })
    .replace(/\r|\n+/g, function () {
      return '\n'
    })
    .replace(/(#+)[^\n]*?(?:\n)/g, function (match, m1) {
      const title = match.replace('\n', '')
      const level = m1.length
      nav.push({
        title: title.replace(/^#+/, '').replace(/\([^)]*?\)/, ''),
        level,
        children: []
      })
      if (!navLevel.includes(level) && level !== 1) {
        // =1 为标题
        navLevel.push(level)
      }
    })

  // 添加报错
  if (!nav[0]) {
    return {
      nav: [],
      navLevel: [],
      length: 0
    }
  }

  // 去掉title
  // if (nav[0].level === 1) {
  //     nav.shift();
  // }

  let index = 0
  nav = nav.map((item) => {
    item.index = index++
    return item
  })

  navLevel = navLevel.sort()
  let retNavs = []
  let toAppendNavList
  navLevel.forEach((level) => {
    toAppendNavList = find(nav, {
      level
    })
    if (retNavs.length === 0) {
      retNavs = retNavs.concat(toAppendNavList)
    } else {
      toAppendNavList.forEach((toAppendNav) => {
        toAppendNav = Object.assign(toAppendNav)
        const parentNavIndex = getParentIndex(nav, toAppendNav.index)

        return appendToParentNav(retNavs, parentNavIndex, toAppendNav)
      })
    }
  })

  // 同一级的Level不一样的时候，需要做顺序调整
  retNavs = retNavs.map((navItem) => {
    const children = navItem.children || []
    if (children.length === 0) {
      return navItem
    }
    navItem.children = indexSort(navItem.children)
    return navItem
  })

  return {
    nav: retNavs, // 所有mk标题
    navLevel, // 所有标题层级
    length: nav.length // 标题长度
  }
}

/**
 *
 * @param {*} arr 所有nav列表
 * @param {*} condition 当前等级 {leave: 3}
 * @returns
 */
function find(arr, condition) {
  return arr.filter((item) => {
    for (const key in condition) {
      if (condition.hasOwnProperty(key) && condition[key] !== item[key]) {
        /* 返回false的意义是假如结构是 34 12345会移除掉34 只会拿到最小值后面的 */
        return false
      }
    }
    return true
  })
}

function findIndex(arr, condition) {
  let ret = -1
  arr.forEach((item, index) => {
    for (const key in condition) {
      if (condition.hasOwnProperty(key) && condition[key] !== item[key]) {
        // 不进行深比较
        return false
      }
    }
    ret = index
  })
  return ret
}

function getParentIndex(nav, endIndex) {
  for (let i = endIndex - 1; i >= 0; i--) {
    if (nav[endIndex].level > nav[i].level) {
      return nav[i].index
    }
  }
}

function appendToParentNav(nav, parentIndex, newNav) {
  // 先第一级里面找，找不到再去children中去找
  const index = findIndex(nav, {
    index: parentIndex
  })

  if (index === -1) {
    let subNav

    for (let i = 0; i < nav.length; i++) {
      subNav = nav[i]
      subNav.children.length &&
        appendToParentNav(subNav.children, parentIndex, newNav)
    }
  } else {
    nav[index].children = nav[index].children.concat(newNav)
  }
}

function indexSort(navList) {
  // 有子元素，检查level是否相同
  const needSort =
    find(navList, {
      level: navList[0].level
    }).length !== navList.length

  if (needSort === false) return navList

  return navList
    .map((nav) => {
      return nav.index
    })
    .sort()
    .map((index) => {
      const nav = find(navList, {
        index
      })

      if ((nav.children || []).length > 1) {
        nav.children = indexSort(nav.children)
      }

      return nav[0]
    })
}

export default compileMd
