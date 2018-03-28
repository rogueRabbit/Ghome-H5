const country = ()=>{
    let countryList= [
        {
            "text": "中国",
            "flag": "+86",
            "word": "常用"
        },
        {
            "text": "中国香港",
            "flag": "+852",
            "word": "常用"
        },
        {
            "text": "中国台湾",
            "flag": "+886",
            "word": "常用"
        },
        {
            "text": "日本",
            "flag": "+81",
            "word": "常用"
        },
        {
            "text": "韩国",
            "flag": "+82",
            "word": "常用"
        },
        {
            "text": "美国",
            "flag": "+1",
            "word": "A"
        },
        {
            "text": "阿尔巴尼亚",
            "flag": "+355",
            "word": "A"
        },
        {
            "text": "阿尔及利亚",
            "flag": "+213",
            "word": "A"
        },
        {
            "text": "阿富汗",
            "flag": "+93",
            "word": "A"
        },
        {
            "text": "阿根廷",
            "flag": "+54",
            "word": "A"
        },
        {
            "text": "阿拉伯联合酋长国‫",
            "flag": "+971",
            "word": "A"
        },
        {
            "text": "阿鲁巴",
            "flag": "+297",
            "word": "A"
        },
        {
            "text": "阿曼‫",
            "flag": "+968",
            "word": "A"
        },
        {
            "text": "阿塞拜疆",
            "flag": "+994",
            "word": "A"
        },
        {
            "text": "埃及‫",
            "flag": "+20",
            "word": "A"
        },
        {
            "text": "埃塞俄比亚",
            "flag": "+251",
            "word": "A"
        },
        {
            "text": "爱尔兰",
            "flag": "+353",
            "word": "A"
        },
        {
            "text": "爱沙尼亚",
            "flag": "+372",
            "word": "A"
        },
        {
            "text": "安道尔",
            "flag": "+376",
            "word": "A"
        },
        {
            "text": "安哥拉",
            "flag": "+244",
            "word": "A"
        },
        {
            "text": "安圭拉",
            "flag": "+1264",
            "word": "A"
        },
        {
            "text": "安提瓜和巴布达",
            "flag": "+1268",
            "word": "A"
        },
        {
            "text": "奥地利",
            "flag": "+43",
            "word": "A"
        },
        {
            "text": "澳大利亚",
            "flag": "+61",
            "word": "A"
        },
        {
            "text": "澳门",
            "flag": "+853",
            "word": "A"
        },
        {
            "text": "巴巴多斯",
            "flag": "+1246",
            "word": "B"
        },
        {
            "text": "巴哈马",
            "flag": "+1242",
            "word": "B"
        },
        {
            "text": "巴基斯坦",
            "flag": "+92",
            "word": "B"
        },
        {
            "text": "巴拉圭",
            "flag": "+595",
            "word": "B"
        },
        {
            "text": "巴勒斯坦领土",
            "flag": "+970",
            "word": "B"
        },
        {
            "text": "巴林",
            "flag": "+973",
            "word": "B"
        },
        {
            "text": "巴拿马",
            "flag": "+507",
            "word": "B"
        },
        {
            "text": "巴西",
            "flag": "+55",
            "word": "B"
        },
        {
            "text": "白俄罗斯",
            "flag": "+375",
            "word": "B"
        },
        {
            "text": "百慕大",
            "flag": "+1441",
            "word": "B"
        },
        {
            "text": "保加利亚",
            "flag": "+359",
            "word": "B"
        },
        {
            "text": "北马里亚纳群岛",
            "flag": "+1",
            "word": "B"
        },
        {
            "text": "贝宁",
            "flag": "+229",
            "word": "B"
        },
        {
            "text": "比利时",
            "flag": "+32",
            "word": "B"
        },
        {
            "text": "冰岛",
            "flag": "+354",
            "word": "B"
        },
        {
            "text": "波多黎各",
            "flag": "+1787",
            "word": "B"
        },
        {
            "text": "波斯尼亚和黑塞哥维那",
            "flag": "+387",
            "word": "B"
        },
        {
            "text": "玻利维亚",
            "flag": "+591",
            "word": "B"
        },
        {
            "text": "伯利兹",
            "flag": "+501",
            "word": "B"
        },
        {
            "text": "博茨瓦纳",
            "flag": "+267",
            "word": "B"
        },
        {
            "text": "不丹",
            "flag": "+975",
            "word": "B"
        },
        {
            "text": "布基纳法索",
            "flag": "+226",
            "word": "B"
        },
        {
            "text": "布隆迪",
            "flag": "+257",
            "word": "B"
        },
        {
            "text": "赤道几内亚",
            "flag": "+240",
            "word": "C"
        },
        {
            "text": "丹麦",
            "flag": "+45",
            "word": "D"
        },
        {
            "text": "德国",
            "flag": "+49",
            "word": "D"
        },
        {
            "text": "多哥",
            "flag": "+228",
            "word": "D"
        },
        {
            "text": "多米尼克",
            "flag": "+1767",
            "word": "D"
        },
        {
            "text": "多米尼加共和国",
            "flag": "+1809",
            "word": "D"
        },
        {
            "text": "俄罗斯",
            "flag": "+7",
            "word": "E"
        },
        {
            "text": "厄瓜多尔",
            "flag": "+593",
            "word": "E"
        },
        {
            "text": "厄立特里亚",
            "flag": "+291",
            "word": "E"
        },
        {
            "text": "法国",
            "flag": "+33",
            "word": "F"
        },
        {
            "text": "法罗群岛",
            "flag": "+298",
            "word": "F"
        },
        {
            "text": "法属波利尼西亚",
            "flag": "+689",
            "word": "F"
        },
        {
            "text": "法属圭亚那",
            "flag": "+594",
            "word": "F"
        },
        {
            "text": "斐济",
            "flag": "+679",
            "word": "F"
        },
        {
            "text": "芬兰",
            "flag": "+358",
            "word": "F"
        },
        {
            "text": "佛得角",
            "flag": "+238",
            "word": "F"
        },
        {
            "text": "冈比亚",
            "flag": "+220",
            "word": "G"
        },
        {
            "text": "刚果(布)",
            "flag": "+242",
            "word": "G"
        },
        {
            "text": "刚果(金)",
            "flag": "+243",
            "word": "G"
        },
        {
            "text": "哥伦比亚",
            "flag": "+57",
            "word": "G"
        },
        {
            "text": "哥斯达黎加",
            "flag": "+506",
            "word": "G"
        },
        {
            "text": "格林纳达",
            "flag": "+1473",
            "word": "G"
        },
        {
            "text": "格陵兰",
            "flag": "+299",
            "word": "G"
        },
        {
            "text": "格鲁吉亚",
            "flag": "+995",
            "word": "G"
        },
        {
            "text": "古巴",
            "flag": "+53",
            "word": "G"
        },
        {
            "text": "瓜德罗普岛",
            "flag": "+590",
            "word": "G"
        },
        {
            "text": "关岛",
            "flag": "+1671",
            "word": "G"
        },
        {
            "text": "圭亚那",
            "flag": "+592",
            "word": "G"
        },
        {
            "text": "海地",
            "flag": "+509",
        },
        {
            "text": "韩国",
            "flag": "+82",
            "word": "H"
        },
        {
            "text": "荷兰",
            "flag": "+31",
            "word": "H"
        },
        {
            "text": "荷属安的列斯群岛",
            "flag": "+599",
            "word": "H"
        },
        {
            "text": "黑山共和国",
            "flag": "+382",
            "word": "H"
        },
        {
            "text": "洪都拉斯",
            "flag": "+504",
            "word": "H"
        },
        {
            "text": "吉布提",
            "flag": "+253",
            "word": "J"
        },
        {
            "text": "吉尔吉斯斯坦",
            "flag": "+996",
            "word": "J"
        },
        {
            "text": "几内亚",
            "flag": "+224",
            "word": "J"
        },
        {
            "text": "几内亚比绍",
            "flag": "+245",
            "word": "J"
        },
        {
            "text": "加拿大",
            "flag": "+1",
            "word": "J"
        },
        {
            "text": "加纳",
            "flag": "+233",
            "word": "J"
        },
        {
            "text": "加蓬",
            "flag": "+241",
            "word": "J"
        },
        {
            "text": "柬埔寨",
            "flag": "+855",
            "word": "J"
        },
        {
            "text": "捷克共和国",
            "flag": "+420",
            "word": "J"
        },
        {
            "text": "津巴布韦",
            "flag": "+263",
            "word": "J"
        },
        {
            "text": "喀麦隆",
            "flag": "+237",
        },
        {
            "text": "卡塔尔",
            "flag": "+974",
            "word": "K"
        },
        {
            "text": "开曼群岛",
            "flag": "+1345",
            "word": "K"
        },
        {
            "text": "科摩罗",
            "flag": "+269",
            "word": "K"
        },
        {
            "text": "科特迪瓦",
            "flag": "+225",
            "word": "K"
        },
        {
            "text": "科威特",
            "flag": "+965",
            "word": "K"
        },
        {
            "text": "克罗地亚",
            "flag": "+385",
            "word": "K"
        },
        {
            "text": "肯尼亚",
            "flag": "+254",
            "word": "K"
        },
        {
            "text": "拉脱维亚",
            "flag": "+371",
            "word": "L"
        },
        {
            "text": "莱索托",
            "flag": "+266",
            "word": "L"
        },
        {
            "text": "老挝人民民主共和国",
            "flag": "+856",
            "word": "L"
        },
        {
            "text": "黎巴嫩",
            "flag": "+961",
            "word": "L"
        },
        {
            "text": "立陶宛",
            "flag": "+370",
            "word": "L"
        },
        {
            "text": "利比里亚",
            "flag": "+231",
            "word": "L"
        },
        {
            "text": "利比亚",
            "flag": "+218",
            "word": "L"
        },
        {
            "text": "列支敦士登",
            "flag": "+423",
            "word": "L"
        },
        {
            "text": "留尼汪",
            "flag": "+262",
            "word": "L"
        },
        {
            "text": "卢森堡",
            "flag": "+352",
            "word": "L"
        },
        {
            "text": "卢旺达",
            "flag": "+250",
            "word": "L"
        },
        {
            "text": "罗马尼亚",
            "flag": "+40",
            "word": "L"
        },
        {
            "text": "马达加斯加",
            "flag": "+261",
            "word": "M"
        },
        {
            "text": "马尔代夫",
            "flag": "+960",
            "word": "M"
        },
        {
            "text": "马耳他",
            "flag": "+356",
            "word": "M"
        },
        {
            "text": "马拉维",
            "flag": "+265",
            "word": "M"
        },
        {
            "text": "马来西亚",
            "flag": "+60",
            "word": "M"
        },
        {
            "text": "马里",
            "flag": "+223",
            "word": "M"
        },
        {
            "text": "马其顿",
            "flag": "+389",
            "word": "M"
        },
        {
            "text": "马绍尔群岛",
            "flag": "+692",
            "word": "M"
        },
        {
            "text": "马提尼克群岛",
            "flag": "+596",
            "word": "M"
        },
        {
            "text": "毛里求斯",
            "flag": "+230",
            "word": "M"
        },
        {
            "text": "毛里塔尼亚",
            "flag": "+222",
            "word": "M"
        },
        {
            "text": "美国",
            "flag": "+1",
            "word": "M"
        },
        {
            "text": "美属萨摩亚",
            "flag": "+1684",
            "word": "M"
        },
        {
            "text": "美属维京群岛",
            "flag": "+1340",
            "word": "M"
        },
        {
            "text": "蒙古",
            "flag": "+976",
            "word": "M"
        },
        {
            "text": "蒙塞拉特群岛",
            "flag": "+1664",
            "word": "M"
        },
        {
            "text": "孟加拉国",
            "flag": "+880",
            "word": "M"
        },
        {
            "text": "秘鲁",
            "flag": "+51",
            "word": "M"
        },
        {
            "text": "密克罗尼西亚联邦",
            "flag": "+691",
            "word": "M"
        },
        {
            "text": "缅甸",
            "flag": "+95",
            "word": "M"
        },
        {
            "text": "摩尔多瓦",
            "flag": "+373",
            "word": "M"
        },
        {
            "text": "摩洛哥",
            "flag": "+212",
            "word": "M"
        },
        {
            "text": "摩纳哥",
            "flag": "+377",
            "word": "M"
        },
        {
            "text": "莫桑比克",
            "flag": "+258",
            "word": "M"
        },
        {
            "text": "墨西哥",
            "flag": "+52",
            "word": "M"
        },
        {
            "text": "纳米比亚",
            "flag": "+264",
            "word": "N"
        },
        {
            "text": "南非",
            "flag": "+27",
            "word": "N"
        },
        {
            "text": "瑙鲁",
            "flag": "+674",
            "word": "N"
        },
        {
            "text": "尼泊尔",
            "flag": "+977",
            "word": "N"
        },
        {
            "text": "尼加拉瓜",
            "flag": "+505",
            "word": "N"
        },
        {
            "text": "尼日尔",
            "flag": "+227",
            "word": "N"
        },
        {
            "text": "尼日利亚",
            "flag": "+234",
            "word": "N"
        },
        {
            "text": "挪威",
            "flag": "+47",
            "word": "N"
        },
        {
            "text": "诺福克岛",
            "flag": "+6723",
            "word": "N"
        },
        {
            "text": "帕劳",
            "flag": "+680",
            "word": "P"
        },
        {
            "text": "葡萄牙",
            "flag": "+351",
            "word": "P"
        },
        {
            "text": "日本",
            "flag": "+81",
            "word": "R"
        },
        {
            "text": "瑞典",
            "flag": "+46",
            "word": "R"
        },
        {
            "text": "瑞士",
            "flag": "+41",
            "word": "R"
        },
        {
            "text": "萨尔瓦多",
            "flag": "+503",
            "word": "S"
        },
        {
            "text": "萨摩亚",
            "flag": "+685",
            "word": "S"
        },
        {
            "text": "塞尔维亚",
            "flag": "+381",
            "word": "S"
        },
        {
            "text": "塞拉利昂",
            "flag": "+232",
            "word": "S"
        },
        {
            "text": "塞内加尔",
            "flag": "+221",
            "word": "S"
        },
        {
            "text": "塞浦路斯",
            "flag": "+357",
            "word": "S"
        },
        {
            "text": "塞舌尔群岛",
            "flag": "+248",
            "word": "S"
        },
        {
            "text": "沙特阿拉伯",
            "flag": "+966",
            "word": "S"
        },
        {
            "text": "圣基茨和尼维斯",
            "flag": "+1869",
            "word": "S"
        },
        {
            "text": "圣卢西亚",
            "flag": "+1758",
            "word": "S"
        },
        {
            "text": "圣马力诺",
            "flag": "+378",
            "word": "S"
        },
        {
            "text": "圣皮埃尔和密克隆",
            "flag": "+508",
            "word": "S"
        },
        {
            "text": "圣文森特和格林纳丁斯",
            "flag": "+1784",
            "word": "S"
        },
        {
            "text": "斯里兰卡",
            "flag": "+94",
            "word": "S"
        },
        {
            "text": "斯洛伐克",
            "flag": "+421",
            "word": "S"
        },
        {
            "text": "斯洛文尼亚",
            "flag": "+386",
            "word": "S"
        },
        {
            "text": "斯威士兰",
            "flag": "+268",
            "word": "S"
        },
        {
            "text": "苏丹",
            "flag": "+249",
            "word": "S"
        },
        {
            "text": "苏里南",
            "flag": "+597",
            "word": "S"
        },
        {
            "text": "索马里",
            "flag": "+252",
            "word": "S"
        },
        {
            "text": "塔吉克斯坦",
            "flag": "+992",
            "word": "T"
        },
        {
            "text": "台湾",
            "flag": "+886",
            "word": "T"
        },
        {
            "text": "泰国",
            "flag": "+66",
            "word": "T"
        },
        {
            "text": "坦桑尼亚",
            "flag": "+255",
            "word": "T"
        },
        {
            "text": "汤加",
            "flag": "+676",
            "word": "T"
        },
        {
            "text": "特克斯和凯科斯群岛",
            "flag": "+1649",
            "word": "T"
        },
        {
            "text": "特立尼达和多巴哥",
            "flag": "+1868",
            "word": "T"
        },
        {
            "text": "突尼斯",
            "flag": "+216",
            "word": "T"
        },
        {
            "text": "图瓦卢",
            "flag": "+688",
            "word": "T"
        },
        {
            "text": "土耳其",
            "flag": "+90",
            "word": "T"
        },
        {
            "text": "土库曼斯坦",
            "flag": "+993",
            "word": "T"
        },
        {
            "text": "瓦努阿图",
            "flag": "+678",
            "word": "W"
        },
        {
            "text": "危地马拉",
            "flag": "+502",
            "word": "W"
        },
        {
            "text": "委内瑞拉",
            "flag": "+58",
            "word": "W"
        },
        {
            "text": "文莱",
            "flag": "+673",
            "word": "W"
        },
        {
            "text": "乌干达",
            "flag": "+256",
            "word": "W"
        },
        {
            "text": "乌克兰",
            "flag": "+380",
            "word": "W"
        },
        {
            "text": "乌拉圭",
            "flag": "+598",
            "word": "W"
        },
        {
            "text": "乌兹别克斯坦",
            "flag": "+998",
            "word": "W"
        },
        {
            "text": "西班牙",
            "flag": "+34",
            "word": "X"
        },
        {
            "text": "希腊",
            "flag": "+30",
            "word": "X"
        },
        {
            "text": "香港",
            "flag": "+852",
            "word": "X"
        },
        {
            "text": "新加坡",
            "flag": "+65",
            "word": "X"
        },
        {
            "text": "新喀里多尼亚",
            "flag": "+687",
            "word": "X"
        },
        {
            "text": "新西兰",
            "flag": "+64",
            "word": "X"
        },
        {
            "text": "匈牙利",
            "flag": "+36",
            "word": "X"
        },
        {
            "text": "叙利亚",
            "flag": "+963",
            "word": "X"
        },
        {
            "text": "牙买加",
            "flag": "+1876",
            "word": "Y"
        },
        {
            "text": "亚美尼亚",
            "flag": "+374",
            "word": "Y"
        },
        {
            "text": "也门",
            "flag": "+967",
            "word": "Y"
        },
        {
            "text": "伊拉克",
            "flag": "+964",
            "word": "Y"
        },
        {
            "text": "伊朗",
            "flag": "+98",
            "word": "Y"
        },
        {
            "text": "以色列",
            "flag": "+972",
            "word": "Y"
        },
        {
            "text": "意大利",
            "flag": "+39",
            "word": "Y"
        },
        {
            "text": "印度",
            "flag": "+91",
            "word": "Y"
        },
        {
            "text": "印度尼西亚",
            "flag": "+62",
            "word": "Y"
        },
        {
            "text": "英国",
            "flag": "+44",
            "word": "Y"
        },
        {
            "text": "英属维京群岛",
            "flag": "+1284",
            "word": "Y"
        },
        {
            "text": "约旦",
            "flag": "+962",
            "word": "Y"
        },
        {
            "text": "越南",
            "flag": "+84",
            "word": "Y"
        },
        {
            "text": "中国",
            "flag": "+86",
            "word": "Z"
        },
        {
            "text": "赞比亚",
            "flag": "+260",
            "word": "Z"
        },
        {
            "text": "乍得",
            "flag": "+235",
            "word": "Z"
        },
        {
            "text": "直布罗陀",
            "flag": "+350",
            "word": "Z"
        },
        {
            "text": "智利(Chile) ",
            "flag": "+56",
            "word": "Z"
        },
        {
            "text": "中非共和国",
            "flag": "+236",
            "word": "Z"
        }
    ];
    return countryList;
}
export {country}