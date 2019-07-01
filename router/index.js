const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const PartyMemRep = require('../models/partyMemRep');
const PartyMemInfo = require('../models/partyMemInfo');
const MeetingInfo = require('../models/meetingInfo');
const InfoCommunicating = require('../models/infoCoummunicating');
const time = require('../utils/date');

// 查看是否有此用户  用户相关
router.get('/', (req, res) => {
  let admin = new Admin({
    'account': 'admin',
    'password': '123456'
  });

  admin.save(function (err, data) {
    if (err) {
      console.log('添加失败');
    } else {
      console.log('添加成功！');
    }
  })
});

// 管理员登录
router.post('/login', (req, res) => {
  Admin.find({
    'account': req.body.account,
    'password': req.body.password
  }, (err, data) => {
    if (err) {
      res.send({
        'status': 1001,
      });
    } else {
      if (data.length > 0) {
        res.send({
          'status': 1000,
          'data': data
        });
      } else {
        res.send({
          'status': 1001,
        });
      }
    }
  });
});

// 党员报到信息管理, 添加党员报到信息
router.post('/partyMem/rep/add', (req, res) => {

  // 获取系统时间
  let partyMemRep = new PartyMemRep({
    name: req.body.name,
    age: req.body.age,
    phone_number: req.body.phone_number,
    address: req.body.address,
    party_branch: req.body.party_branch,
    specialty: req.body.specialty,
    time: this.body.time  // 报到时间
  });

  partyMemRep.save(function (err, data) {
    if (err) {
      res.send({
        'status': 1001,
        'data': partyMemRep
      });
    } else {
      res.send({
        'status': 1000,
        'data': partyMemRep
      });
    }
  });
});

// 修改党员报到信息
router.post('/partyMem/rep/modify', (req, res) => {

  let updatedPartyMemRep = {
    name: req.body.name,
    age: req.body.age,
    phone_number: req.body.phone_number,
    address: req.body.address,
    party_branch: req.body.party_branch,
    specialty: req.body.specialty,
    time: req.body.time
  };

  if (req.body._id.match(/^[0-9a-fA-F]{24}$/)) {
    PartyMemRep.findByIdAndUpdate(req.body._id,
      updatedPartyMemRep, {
        upsert: true
      },
      (err, data) => {
        if (err) {
          res.send({
            'status': 1001,
            'data': updatedPartyMemRep
          });
        } else {
          if (data.length > 0) {
            res.send({
              'status': 1000,
              'data': updatedPartyMemRep
            });
          } else {
            res.send({
              'status': 1001,
              'data': updatedPartyMemRep
            });
          }
        }
      });
  } else {
    res.json({
      no: 0,
      message: req.body._id + '！不存在',
    });
  }
});

// 删除党员报到信息
router.post('/partyMem/rep/delete', (req, res) => {
  if (req.body._id.match(/^[0-9a-fA-F]{24}$/)) {
    PartyMemRep.findByIdAndDelete(req.body._id, (err, data) => {
      if (err) {
        res.send({
          'status': 1001,
          'data': data
        });
      } else {
        if (data.length > 0) {
          res.send({
            'status': 1000,
            'data': data
          });
        } else {
          res.send({
            'status': 1001,
            'data': data
          });
        }
      }
    });
  } else {
    res.json({
      no: 0,
      message: req.body._id + '！不存在',
    });
  }

});

// 查看某一党员报到信息
router.get('/partyMem/rep/query', (req, res) => {
  if (req.header._id.match(/^[0-9a-fA-F]{24}$/)) {
    PartyMemRep.findById(req.header._id, (err, data) => {
      if (err) {
        res.send({
          'status': 1001,
          'data': data
        });
      } else {
        if (data.length > 0) {
          res.send({
            'status': 1000,
            'data': data
          });
        } else {
          res.send({
            'status': 1001,
            'data': data
          });
        }
      }
    });
  } else {
    res.json({
      no: 0,
      message: req.body._id + '！不存在',
    });
  }

});

// 查看所有党员报到信息
router.get('/partyMem/rep/query/all', (req, res) => {
  PartyMemRep.find((err, data) => {
    if (err) {
      res.send({
        'status': 1001,
        'data': data
      });
    } else {
      if (data.length > 0) {
        res.send({
          'status': 1000,
          'data': data
        });
      } else {
        res.send({
          'status': 1001,
          'data': data
        });
      }
    }
  });
});

// 党员信息管理，添加党员信息
router.post('/partyMem/info/add', (req, res) => {

  let partyMemInfo = new PartyMemInfo({
    name: req.body.data.name,
    age: req.body.data.age,
    gender: req.body.data.gender,
    party_time: req.body.data.party_time,
    phone_number: req.body.data.phone_number,
    address: req.body.data.address,
    party_branch: req.body.data.data.party_branch,
    specialty: req.body.data.specialty,
    honor: req.body.data.honor
  });

  partyMemInfo.save((err, data) => {
    if (err) {
      res.send({
        'status': 1001,
        'data': partyMemInfo
      });
    } else {
      if (data.length > 0) {
        res.send({
          'status': 1000,
          'data': partyMemInfo
        });
      } else {
        res.send({
          'status': 1001,
          'data': partyMemInfo
        });
      }
    }
  });
});

// 党员信息管理，删除党员信息
router.post('/partyMem/info/delete', (req, res) => {

  if (req.body._id.match(/^[0-9a-fA-F]{24}$/)) {
    PartyMemInfo.findByIdAndDelete(req.body._id, (err, data) => {
      if (err) {
        res.send({
          'status': 1001,
          'data': data
        });
      } else {
        if (data.length > 0) {
          res.send({
            'status': 1000,
            'data': data,
          });
        } else {
          res.send({
            'status': 1001,
            'data': data
          });
        }
      }
    });
  } else {
    res.json({
      no: 0,
      message: req.body._id + '！不存在',
    });
  }

});

// 党员信息管理，修改党员信息
router.post('/partyMem/info/modify', (req, res) => {

  let updatedPartyMemInfo = {
    name: req.body.data.name,
    age: req.body.data.age,
    gender: req.body.data.gender,
    party_time: req.body.data.party_time,
    phone_number: req.body.data.phone_number,
    address: req.body.data.address,
    party_branch: req.body.data.party_branch,
    specialty: req.body.data.specialty,
    honor: req.body.data.honor
  };

  if (req.body._id.match(/^[0-9a-fA-F]{24}$/)) {
    PartyMemInfo.findByIdAndUpdate(req.body._id, updatedPartyMemInfo, (err, data) => {
      if (err) {
        res.send({
          'status': 1001,
          'data': data
        });
      } else {
        if (data.length > 0) {
          res.send({
            'status': 1000,
            'data': data,
          });
        } else {
          res.send({
            'status': 1001,
            'data': data
          });
        }
      }
    });
  } else {
    res.json({
      no: 0,
      message: req.body._id + '！不存在',
    });
  }

});

// 党员信息管理，查看某一党员信息
router.get('/partyMem/info/query', (req, res) => {

  if (req.header._id.match(/^[0-9a-fA-F]{24}$/)) {
    PartyMemInfo.findById(req.header._id, (err, data) => {
      if (err) {
        res.send({
          'status': 1001,
          'data': data
        });
      } else {
        if (data.length > 0) {
          res.send({
            'status': 1000,
            'data': data,
          });
        } else {
          res.send({
            'status': 1001,
            'data': data
          });
        }
      }
    });
  } else {
    res.json({
      no: 0,
      message: req.body._id + '！不存在',
    });
  }

});

// 党员信息管理，查看所有党员信息
router.get('/partyMem/info/query/all', (req, res) => {

  PartyMemInfo.find((err, data) => {
    if (err) {
      res.send({
        'status': 1001,
        'data': data
      });
    } else {
      if (data.length > 0) {
        res.send({
          'status': 1000,
          'data': data,
        });
      } else {
        res.send({
          'status': 1001,
          'data': data
        });
      }
    }
  });
});

// 会议信息管理，添加会议信息
router.post('/meetingRecord/add', (req, res) => {

  let meetingInfo = new MeetingInfo({
    meeting_theme: req.body.data.meeting_theme,
    meeting_time: req.body.data.meeting_time,
    meeting_address: req.body.data.meeting_address,
    meeting_moderator: req.body.data.meeting_moderator,
    meeting_attendee: req.body.data.meeting_attendee,
    meeting_absentee: req.body.data.meeting_absentee,
    meeting_content: req.body.data.meeting_content,
    meeting_photo_url: req.body.data.meeting_photo_url,
  });

  meetingInfo.save((err, data) => {
    if (err) {
      res.send({
        'status': 1001,
        'data': meetingInfo
      });
    } else {
      if (data.length > 0) {
        res.send({
          'status': 1000,
          'data': meetingInfo
        });
      } else {
        res.send({
          'status': 1001,
          'data': meetingInfo
        });
      }
    }
  });
});

// 会议信息管理，修改会议信息
router.post('/meetingRecord/modify', (req, res) => {

  let updatedMeetingInfo = {
    meeting_theme: req.body.meeting_theme,
    meeting_time: req.body.meeting_time,
    meeting_address: req.body.meeting_address,
    meeting_moderator: req.body.meeting_moderator,
    meeting_attendee: req.body.meeting_attendee,
    meeting_absentee: req.body.meeting_absentee,
    meeting_content: req.body.meeting_content,
    meeting_photo_url: req.body.meeting_photo_url,
  };

  if (req.body._id.match(/^[0-9a-fA-F]{24}$/)) {
    MeetingInfo.findByIdAndUpdate(req.body._id, updatedMeetingInfo, (err, data) => {
      if (err) {
        res.send({
          'status': 1001,
          'data': data
        });
      } else {
        if (data.length > 0) {
          res.send({
            'status': 1000,
            'data': data,
          });
        } else {
          res.send({
            'status': 1001,
            'data': data
          });
        }
      }
    });
  } else {
    res.json({
      no: 0,
      message: req.body._id + '！不存在',
    });
  }
});

// 会议信息管理，删除会议信息
router.post('/meetingRecord/delete', (req, res) => {

  if (req.body._id.match(/^[0-9a-fA-F]{24}$/)) {
    MeetingInfo.findByIdAndDelete(req.body._id, (err, data) => {
      if (err) {
        res.send({
          'status': 1001,
          'data': data
        });
      } else {
        if (data.length > 0) {
          res.send({
            'status': 1000,
            'data': data,
          });
        } else {
          res.send({
            'status': 1001,
            'data': data
          });
        }
      }
    });
  } else {
    res.json({
      no: 0,
      message: req.body._id + '！不存在',
    });
  }

});

// 会议信息管理，查看某一会议信息
router.get('/meetingRecord/query', (req, res) => {

  if (req.header._id.match(/^[0-9a-fA-F]{24}$/)) {
    MeetingInfo.findById(req.header._id, (err, data) => {
      if (err) {
        res.send({
          'status': 1001,
          'data': data
        });
      } else {
        if (data.length > 0) {
          res.send({
            'status': 1000,
            'data': data,
          });
        } else {
          res.send({
            'status': 1001,
            'data': data
          });
        }
      }
    });
  } else {
    res.json({
      no: 0,
      message: req.body._id + '！不存在',
    });
  }

});

// 会议信息管理，查看所有会议信息
router.get('/meetingRecord/query/all', (req, res) => {

  MeetingInfo.find((err, data) => {
    if (err) {
      res.send({
        'status': 1001,
        'data': data
      });
    } else {
      if (data.length > 0) {
        res.send({
          'status': 1000,
          'data': data,
        });
      } else {
        res.send({
          'status': 1001,
          'data': data
        });
      }
    }
  });
});

// 信息交流中心管理，添加信息
router.post('/infoCommunicating/add', (req, res) => {

  let infoCommunicating = new InfoCommunicating({
    post_theme: req.body.post_theme,
    post_owner: req.body.post_owner,
    published_time: req.body.published_time,
    post_content_address: req.body.post_content_address,
    post_content_salary: req.body.post_content_salary,
    post_content_duration: req.body.post_content_duration,
    post_content_comms: req.body.post_content_comms,
  });

  infoCommunicating.save((err, data) => {
    if (err) {
      res.send({
        'status': 1001,
        'data': data
      });
    } else {
      if (data.length > 0) {
        res.send({
          'status': 1000,
          'data': data
        });
      } else {
        res.send({
          'status': 1001,
          'data': data
        });
      }
    }
  });
});

// 信息交流中心管理，修改信息
router.post('/infoCommunicating/modify', (req, res) => {

  let updatedInfoCommunicating = {
    post_theme: req.body.data.post_theme,
    post_owner: req.body.data.post_owner,
    published_time: req.body.data.published_time,
    post_content_address: req.body.data.post_content_address,
    post_content_salary: req.body.data.post_content_salary,
    post_content_duration: req.body.data.post_content_duration,
    post_content_comms: req.body.data.post_content_comms,
  };

  if (req.body._id.match(/^[0-9a-fA-F]{24}$/)) {
    InfoCommunicating.findByIdAndUpdate(req.body._id, updatedInfoCommunicating, (err, data) => {
      if (err) {
        res.send({
          'status': 1001,
          'data': data
        });
      } else {
        if (data.length > 0) {
          res.send({
            'status': 1000,
            'data': data,
          });
        } else {
          res.send({
            'status': 1001,
            'data': data
          });
        }
      }
    });
  } else {
    res.json({
      no: 0,
      message: req.body._id + '！不存在',
    });
  }

});

// 信息交流中心管理，删除信息
router.post('/infoCommunicating/delete', (req, res) => {

  if (req.body._id.match(/^[0-9a-fA-F]{24}$/)) {
    InfoCommunicating.findByIdAndDelete(req.body._id, (err, data) => {
      if (err) {
        res.send({
          'status': 1001,
          'data': data
        });
      } else {
        if (data.length > 0) {
          res.send({
            'status': 1000,
            'data': data,
          });
        } else {
          res.send({
            'status': 1001,
            'data': data
          });
        }
      }
    });
  } else {
    res.json({
      no: 0,
      message: req.body._id + '！不存在',
    });
  }

});

// 信息交流中心管理，查看信息
router.get('/infoCommunicating/query', (req, res) => {

  if (req.header._id.match(/^[0-9a-fA-F]{24}$/)) {
    InfoCommunicating.findById(req.header._id, (err, data) => {
      if (err) {
        res.send({
          'status': 1001,
          'data': data
        });
      } else {
        if (data.length > 0) {
          res.send({
            'status': 1000,
            'data': data,
          });
        } else {
          res.send({
            'status': 1001,
            'data': data
          });
        }
      }
    });
  } else {
    res.json({
      no: 0,
      message: req.body._id + '！不存在',
    });
  }

});

// 信息交流中心管理，查看所有信息
router.get('/infoCommunicating/query/all', (req, res) => {

  InfoCommunicating.find((err, data) => {
    if (err) {
      res.send({
        'status': 1001,
        'data': data
      });
    } else {
      if (data.length > 0) {
        res.send({
          'status': 1000,
          'data': data,
        });
      } else {
        res.send({
          'status': 1001,
          'data': data
        });
      }
    }
  });
});

module.exports = router
