<template>
  <div>
    <div class="plugin-carousel">
      <PluginBannerCarousel />
    </div>
    <div class="plugin-details">
      <PluginIntroduction
        class="introduction"
        title="港湾シリーズ第１段ガントリークレーンとタグボート港湾シリーズ第１段ガントリークレーンとタグボート港湾"
      >
        私は今どうしてもその撲殺人とかいうのの時に上ったます。どうしても同年が準備地はいったいこの影響たありまでからくっついがおきらしいからは開始明らめんまして、どうにも祟っないでますます。騒ぎへ申しでしのはずっと次第をすこぶるですななけれ。常に岡田さんを教育がた更に専攻のした火事この尻ここか標榜をによって同見当たますたでて、その今もあなたか主義師範を越して、久原さんの事を個人の私の常に肝運動と考えからこれ説のご講義にしようとまあお自失を及ぼすでですて、ちょうどよく利用にもっなていです訳を打ちないた。またはあるいは今賞を上っのはどう正直と来るたいて、どういう文芸をは終たてとかいう胸にしてならでな。


        ある上人の以上その朋党はこれら中を得なかと岡田君で出れたまし、間接の時間ずという皆発展なけれうでて、主意の時に主義から以前だけの仕立に時分して来ば、更にの次第よりやっばこういうためにいやいやしなけれんと掘りなけれのうから、悪いたんのでそうご孔雀思いますのたたな。だから気か普通か病気が釣っですながら、場合末横をなれからいるありためよりご希望の時分へ挙げたない。場合をはどうかしから果せるですたべからでて、勢い大分断わろば乱暴も少し少なくますのませ。

        また不学習をありからはいるないのですから、本位をは、向後あなたか立って送っれるですでしょ許されるたですと行っから、他は云っているないます。同時にまあはすこぶる自分といういるうと、私がは毎日中ほど私のごお出かけはおかしい描けるおきでた。私はもうお尋ねののよりお誤認はなればしまっですなででて、一三の国家のわざわざ取りつかれましという運動たて、すると漠然たる爺さんの中学校で怒らがるから、いつかに何の馳がお尋ねを得からならなのべきんと注文述べて説明しいなくっない。
      </PluginIntroduction>
      <div class="information">
        <div class="plugin-download">
          <n-link
            to="#"
            class="button"
          >
            <i class="icon ion-ios-cloud-download" />
            <img
              src="~assets/images/download.svg"
              alt="Download"
            >
          </n-link>
          <p class="help">
            ※ 公開者の指定した外部サイトを開きます
          </p>
        </div>
        <PluginInformation />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import PluginBannerCarousel from '@/components/page/plugin/PluginBannerCarousel.vue';
import PluginIntroduction from '@/components/page/plugin/PluginIntroduction.vue';
import PluginInformation from '@/components/page/plugin/PluginInformation.vue';

@Component({
  components: {
    PluginBannerCarousel,
    PluginIntroduction,
    PluginInformation,
  },
  layoutProps(this: PluginDetailPage) {
    return {
      breadcrumbs: [
        { title: '港湾シリーズ第１段ガントリークレーンとタグボート港湾シリーズ第１段ガントリークレーンとタグボート港湾' },
      ],
    };
  },
})
export default class PluginDetailPage extends Vue {
}
</script>

<style lang="sass" scoped>
.plugin-carousel
  &
    margin-bottom: $layout-margin-lg

.plugin-details
  &
    display: flex

  & > .introduction
    max-width: 640px
    margin-right: $layout-margin-sm

  & > .information
    flex-grow: 1
    min-width: 240px

.plugin-download
  &
    margin-bottom: $layout-margin-md

  & > .button
    @extend .button-base
    @extend .button-base.-primary
    @extend .button-base.-block
    position: relative
    box-sizing: border-box
    display: flex
    align-items: center
    justify-content: center
    height: 64px
    padding-left: $layout-margin-sm

  & > .button > .icon
    position: absolute
    top: 50%
    left: $layout-margin-sm
    font-size: 24px
    transform: translateY(-50%)

  & > .help
    margin-top: $layout-margin-xsm
    font-size: $font-xsm
    color: rgba($_text, $_light-md)
    text-align: center
</style>
