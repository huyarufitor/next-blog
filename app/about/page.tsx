import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "关于",
  description: `了解 ${siteConfig.author.name}：一个在音视频与音乐相关 Web 领域工作的开发者，记录技术、生活、运动与 AI 时代的思考。`,
  path: "/about",
});

const identityNotes = [
  "我是一个很认真生活的人，也是一个愿意长期打磨手艺的女开发者。过去几年里，我在音视频领域工作了 4 年，又在音乐相关的 Web 方向继续做了 2 年。技术对我来说从来不只是工作技能，它也是我理解内容、表达、体验和人与人连接方式的一种语言。",
  "我喜欢把复杂的问题拆开，把模糊的需求落地成真正能被使用的东西。如果一个产品既和声音、节奏、创作有关，又要照顾真实用户的体验，我通常会很有热情。某种程度上，我一直在做的事情，就是把抽象想法翻译成可感知、可交互、可持续维护的体验。",
  "我也相信，一个人的职业状态和生活状态其实是连在一起的。比起只做一个会赶需求的人，我更想成为一个有判断力、有审美、有节奏感，也有长期热爱的建设者。",
];

const blogTopics = [
  "技术实践：前端工程、交互体验、内容系统、音视频或音乐相关 Web 产品里的实现细节与取舍。",
  "工作手记：做项目时踩过的坑、想到的方法、一些没有标准答案但值得记录的判断过程。",
  "音乐学习：练习过程、听感积累、喜欢的声音、一些关于节奏、表达和创作的个人体会。",
  "生活切片：健身、游泳、羽毛球，以及那些帮助我维持身体感受和精神秩序的小习惯。",
  "人生思考：关于成长、职业方向、女性开发者的自我定位，以及在变化很快的时代里如何保留自己的热爱。",
];

const recentWork = [
  "最近我依然在做和音视频体验、音乐内容表达相关的 Web 工作。对我来说，写页面早就不只是把功能堆出来，而是去想一个产品怎样才真正顺手、自然、耐用。很多时候，我会同时在意结构是不是清楚、交互是不是有节奏、信息有没有被好好组织，以及一个细节到底值不值得被打磨。",
  "除了具体业务，我最近也会花不少时间重新整理自己的工作方式。比如怎样在 AI 工具越来越普及的情况下，保留独立判断；怎样让自己不是更忙，而是真的更有效；怎样把经验沉淀成可复用的方法，而不是做完一个需求就把思考丢掉。这也是我想持续写博客的原因之一，我希望把这些过程留下来。",
  "另一方面，我也在慢慢把技术之外的兴趣放回到生活中心。音乐学习、运动、一些更细小的感受训练，看起来像是和工作无关的事，但它们其实一直在反过来塑造我的专注力、审美和节奏感。我最近越来越相信，一个人如何生活，会真实地影响她如何工作。",
];

const currentQuestions = [
  "AI 正在迅速改变软件行业，这件事让我兴奋，也让我保持警觉。我想学会使用新的工具，但不想把自己训练成一个只会追逐效率、复制答案的人。我更在意的是，在工具越来越强之后，人真正不可替代的部分到底是什么。",
  "我想继续靠近那些让我长期有兴趣的方向，比如音乐、声音、内容表达、真实体验和有温度的产品。我希望未来做的工作，不只是更快地完成需求，而是依然能让我觉得自己在参与创造，而不是被洪流推着走。",
  "写这个博客，也是因为我想给自己留一个稳定的坐标。把想法写下来，把阶段性的困惑讲清楚，把那些看起来零散的兴趣、工作和生活经验慢慢串起来。很多答案未必会立刻出现，但记录会让人更接近答案。",
];

const focusTopics = [
  "我最近很关注 AI 到底会怎样改变前端和产品工作流。不是停留在“这个工具能不能提效”的层面，而是更进一步地想：如果生成越来越容易，什么才算真正有价值的表达？如果执行成本越来越低，人的品味、判断、同理心和长期思考能力会不会反而变得更重要？",
  "我也会持续关注声音、音乐和交互体验之间的关系。无论是播放器、创作工具、社区内容，还是更轻量的练习类产品，我都对“声音如何被更好地组织、呈现和体验”这件事有很强的兴趣。它兼具技术、内容和感受，这也是我很难放下这个方向的原因。",
  "另外，我也在关注女性开发者如何建立自己的职业叙事。不是只用技能点来定义自己，而是更完整地看待自己的能力边界、审美倾向、生活方式和长期选择。我希望自己不是被行业推着走，而是在变化里一点点长出更稳定的自我。",
];

const peopleToMeet = [
  "我想认识那些既认真工作，也认真生活的人。你可以是开发者、设计师、产品经理、音乐人、内容创作者，或者只是一个对自己的事情有长期热情的人。比起头衔，我更在意一个人有没有真实兴趣、有没有持续打磨某件事的耐心。",
  "如果你也在做音视频、音乐、内容表达相关的产品，或者你也在探索 AI 时代里什么样的工作仍然值得投入，我们应该会有不少共同语言。我很喜欢和愿意思考的人聊天，尤其是那些不满足于“把事情做完”，而是会继续追问“这件事为什么值得做”“还能不能更好”的人。",
  "我也很愿意认识那些会分享生活质感的人。会因为一次运动、一段旋律、一篇文章、一个界面细节而认真开心的人，通常也更容易理解我为什么会写这个博客。这里想留下的不只是职业轨迹，也是一种生活方式和感受世界的方法。",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <header className="space-y-5">
        <p className="eyebrow">关于</p>
        <h1 className="text-5xl font-semibold text-strong">
          把技术、音乐和生活，放在同一张桌子上。
        </h1>
        <div className="space-y-4 text-lg leading-8 text-muted">
          <p>
            我是 {siteConfig.author.name}。我喜欢生活本身，也愿意认真对待生活里反复出现的那些细节：
            一次训练后的疲惫感，一首歌里很轻的和声，一个页面交互里刚刚好的停顿，
            还有一段代码在复杂度与可维护性之间取得平衡时带来的那种安静满足。
          </p>
          <p>
            这些年，我一直在技术和感受之间来回穿梭。一边在音视频和音乐相关的业务里写 Web、
            做产品、磨体验，一边也在想，什么样的工作值得长期投入，什么样的表达值得慢慢积累。
            这个页面不是简历，也不是技能列表，它更像是一份留给陌生读者的自我介绍。
          </p>
        </div>
      </header>

      <section className="surface-panel rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-strong">
          我是谁
        </h2>
        <div className="mt-5 space-y-4 text-base leading-8 text-muted">
          {identityNotes.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      <section className="surface-panel rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-strong">
          这个博客会写什么
        </h2>
        <ul className="mt-5 space-y-3 text-base leading-8 text-muted">
          {blogTopics.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="surface-panel rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-strong">
          工作之外的我
        </h2>
        <div className="mt-5 space-y-4 text-base leading-8 text-muted">
          <p>
            工作之外，我很喜欢运动。健身、游泳、羽毛球都在我的生活里占有稳定的位置。
            它们对我来说不是附属爱好，也不只是为了“保持状态”，而是一种很重要的身体感知训练。
            我喜欢在力量训练里重新找到重心，也喜欢在水里把思绪慢慢放平，还喜欢羽毛球那种需要反应、
            节奏和判断同时在线的感觉。
          </p>
          <p>
            很多时候，真正帮我整理思路的不是继续盯着屏幕，而是离开桌子，去出汗，去呼吸，去动起来。
            我对“热爱生活”这件事的理解也很朴素：认真工作，认真休息，认真吃饭，认真感受身体，
            认真对待自己喜欢的人和事。一个人怎么过日子，往往也会决定她怎么写代码、怎么做产品、怎么理解世界。
          </p>
        </div>
      </section>

      <section className="surface-panel rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-strong">
          最近在做什么
        </h2>
        <div className="mt-5 space-y-4 text-base leading-8 text-muted">
          {recentWork.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      <section className="surface-panel rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-strong">
          最近在关注什么
        </h2>
        <div className="mt-5 space-y-4 text-base leading-8 text-muted">
          {focusTopics.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      <section className="surface-panel rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-strong">
          我现在关心的问题
        </h2>
        <div className="mt-5 space-y-4 text-base leading-8 text-muted">
          {currentQuestions.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      <section className="surface-panel rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-strong">
          想认识什么样的人
        </h2>
        <div className="mt-5 space-y-4 text-base leading-8 text-muted">
          {peopleToMeet.map((item) => (
            <p key={item}>{item}</p>
          ))}
          <p>
            我希望这个博客不是一个只输出结论的地方，而是一个可以看见过程、犹豫、成长和选择的地方。
            它不一定永远正确，也不一定总能给出标准答案，但会尽量真诚，尽量具体，尽量留下一个人的真实痕迹。
          </p>
        </div>
      </section>
    </div>
  );
}
