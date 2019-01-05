//==================================================================================================================
/*:
 * @plugindesc 自定义信息储存 。
 * 
 * @author 芯☆淡茹水
 * 
 * @help
 * ※该插件不提供插件命令，以下全为脚本运行※
 * 〓 使用方法 〓
 * 1，XdRsData.week.saveWeek(key, val)
 *    储存一个以 key 为标识的变量，key 必须用引号（''或""）括上。
 *    val 是其储存的数值。（val 可以是数字，字符串，，，）
 *    例：事件->脚本：XdRsData.week.saveWeek('周目数', 2)
 *    注意：如果相同的 key 标识前面有储存，后面再储存会覆盖掉前面的。所读取的值就是后储存的值。
 *
 * 2，XdRsData.week.val(key)
 *    读取以 key 为标识的所储存的值。同上，key 用引号（''或""）括上。
 *    如果未储存对应的值，读取的值  => null
 *    例：如果上面 方法1 储存了，那么 XdRsData.week.val('周目数')   读取的值 => 2
 *
 * 3，XdRsData.week.deleteKey(key)
 *    删除以 key 为标识的变量。
 *
 * 〓 用法示例 〓
 * 1，读取储存的值代入游戏变量：事件 -> 变量 = 脚本：XdRsData.week.val('示例')
 * 2，条件判断：事件 -> 条件 -> 脚本：XdRsData.week.val('示例') > 2
 * 3，储存字符串：事件 -> 脚本：XdRsData.week.saveWeek('字符串', '这是测试')
 * 4，读取字符串：事件 -> 脚本：XdRsData.week.val('字符串')    => '这是测试'
*/
//==================================================================================================================
;var XdRsData = XdRsData || {};
XdRsData.week = XdRsData.week || {};
XdRsData.week.loadWeekData = function() {
    var json;
    try {json = StorageManager.load('week');}
    catch (e) {console.error(e);return null;}
    return !!json ? JSON.parse(json) : null;
};
XdRsData.week.saveWeek = function(key, val) {
    var data = !!this.loadWeekData() ? this.loadWeekData() : {};
    data[key] = val;
    StorageManager.save('week', JSON.stringify(data));
};
XdRsData.week.deleteKey = function(key) {
    if (!this.loadWeekData()) return;
    var data = this.loadWeekData();
    delete data[key];
    StorageManager.save('week', JSON.stringify(data));
};
XdRsData.week.val = function(key) {
    var data = this.loadWeekData();
    return (!data || data[key] === undefined) ? null : data[key];
};
//==================================================================================================================