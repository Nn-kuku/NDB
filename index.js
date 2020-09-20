const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;
const welcomeChannelName = "테스트1";
const byeChannelName = "테스트2";
const welcomeChannelComment = "안녕하세요, 봇테스트 서버 입니다.";
const byeChannelComment = "안녕히가세요, 봇테스트 서버 였습니다.";

client.on('ready', () => {
  console.log('DS Bot ON');
  client.user.setPresence({ game: { name: '도움말' }, status: 'online' })
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.login(token);

//DM공지 4강

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content.startsWith('전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

client.login(token);

//embed 5강

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == '미사용') {
    let img = 'https://cdn.discordapp.com/attachments/750611741754523660/751716865218183168/2d0c9d73e0aad1a9.jpg';
    let embed = new Discord.RichEmbed()
      .setTitle('NDS 봇')
      .setThumbnail(img)
      .addBlankField()
      .addField('미사용', '미사용')
      .addField('미사용', '미사용', true)
      .addField('미사용', '미사용', true)
      .addField('미사용', '미사용', true)
      .addField('마미사용', '미사용\n미사용\n미사용\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('Nn_kuku', img)

    message.channel.send(embed)
  } else if(message.content == '도움말') {
    let helpImg = 'https://cdn.discordapp.com/attachments/750611741754523660/751716865218183168/2d0c9d73e0aad1a9.jpg';
    let commandList = [
      {name: '도움말', desc: '사용 가능한 명령어 목록'},
      {name: 'help', desc: '감자 명령어'},
      {name: '전체공지', desc: 'dm으로 전체 공지 보내기'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Test Bot', helpImg)
      .setColor('#186de6')
      .setFooter(`Nn_Ab Test BOT`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  }
});

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}


client.login(token);

//감자 명령어

client.on('message', (message) => {
  if (message.content === 'help') {
  message.channel.send('디코, 제작자');
  }
});

client.login(token);

client.on('message', (message) => {
  if (message.content === '디코') {
  message.channel.send('Nn_Ab#4251');
  }
});

client.login(token);

client.on('message', (message) => {
  if (message.content === '제작자') {
  message.channel.send('Ab(에이비)');
  }
});

client.login(token);

//청소 7강

client.on('message', (message) => {
  if(message.content.startsWith('청소 ')) {
      if(checkPermission(message))return;
  
      var clearLine = message.content.slice('청소 '.length);
      var isNum = !isNaN(clearLine)
  
      if(isNum && (clearLine <= 0 || 100 < clearLine)) {
        message.channel.send("1부터 100까지의 숫자만 입력해주세요.")
        return;
      } else if(!isNum) {
        if(message.content.split('<@').length == 2) {
          if(isNaN(message.content.split(' ')[2])) return;
  
          var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
          var count = parseInt(message.content.split(' ')[2])+1;
          const _limit = 10;
          let _cnt = 0;
  
          message.channel.fetchMessages({limit: _limit}).then(collected => {
            collected.every(msg => {
              if(msg.author.id == user) {
                msg.delete();
                ++_cnt;
              }
              return !(_cnt == count);
            });
          });
        }
      } else {
        message.channel.bulkDelete(parseInt(clearLine)+1)
          .then(() => {
            AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지를 삭제했습니다. (이 메세지는 잠시 후에 사라집니다.)");
          })
          .catch(console.error)
      }
    }
})

function checkPermission(message){
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

async function AutoMsgDelete(message, str, delay = 3000) {
  let msg = await message.channel.send(str);

  setTimeout(() => {
    msg.delete();
  }, delay);
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}

client.login(token);

//내꺼(인증번호 해피형)

if(message.content.startsWith('인증번호')) {
  let min = 0;
  let max = 99999;
  let dice_num = parseInt(Math.random() * (max - min) + min);
  message.channel.send(`인증번호:__${dice_num}__ 10분 이내에 입력해주세요!` )}

