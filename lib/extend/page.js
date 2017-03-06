import { getcof, gethtml } from "./files";

const pages = (data, p) => {
  const c = getcof("config.yml");
  
  let current = parseInt(p) ? p : 1,
      page = c.page,
      sum  = data.length,
      max  = Math.ceil(sum/page),
      datas = [];

      // 显示最大页码
      if (current >= max){
        current = max;
      }

      let start = ((current - 1) * page)    // 开始的位置 0 * 3 = 0
      let end   = (current * page);         // 结束的位置 1 * 3 = 3
      // 1 * 3 = 3 
      // 2 * 3 = 6 

      for (let i=start; i<end; i++){
        let o = data[i];
        // 如果没有数据就终止循环
        if(!o) break;
        let pin = ["article", o.category, o.title+".md"];
        o.html = gethtml(pin.join("/"),c.rows);
        datas.push(o);
      }

      return {
        sum: sum,     // 数据总和
        max: max,     // 最大页面
        page: current,// 当前页数
        data: datas
      }

}

module.exports = {
  pages
}