import {message} from "antd";

export default {
    /*获取当前城市*/
    getLocation() {
        let BMap = window.BMap;
        let geolocation = new BMap.Geolocation();
        let data = {}
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == '0') {
                let point = new BMap.Point(r.point.lng, r.point.lat);
                data.point = point;
                let geoc = new BMap.Geocoder();
                geoc.getLocation(point, function (rs) {
                    let addComp = rs.addressComponents;
                    data.city = addComp.city
                })
            } else {
                message.warning(`failed:${this.getStatus()}`)
                return false
            }

        })
        return data
    },
    formatTime(time) {
        if (!time) return;
        let date = new Date(time)
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    }
}
