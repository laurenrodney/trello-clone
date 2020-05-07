<template>
  <div class="board flex flex-col w-full">
    <Marquee></Marquee>
    <div id="main-body" class="flex flex-grow p-4">
      <div class="flex flex-row items-start">
        <BoardColumn
          v-for="(column, $columnIndex) of board.columns"
          :key="$columnIndex"
          :column="column"
          :columnIndex="$columnIndex"
          :board="board"
        />
        <div class="column-flex">
          <input
            type="text"
            class="p-2 mr-2 flex-grow"
            placeholder="+ Add new Column"
            v-model="newColumnName"
            @keyup.enter="createColumn"
          />
        </div>
      </div>
      <div class="task-bg" v-if="isModalOpen" @click.self="close">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BoardColumn from '@/components/BoardColumn'
import Marquee from '@/components/Marquee'
export default {
  components: {
    BoardColumn, Marquee
  },
  data () {
    return {
      newColumnName: ''
    }
  },
  computed: {
    ...mapState(['board']),
    isModalOpen () {
      return this.$route.name === 'task' || this.$route.name === 'delete'
    }
  },
  methods: {
    close () {
      this.$router.push({ name: 'board' })
    },
    createColumn () {
      this.$store.commit('CREATE_COLUMN', {
        name: this.newColumnName
      })
      this.newColumnName = ''
    }
  }
}
</script>

<style lang="css">
.board {
  @apply h-full overflow-auto;
  background-image: linear-gradient(#bfebe1, 75%, #f55c5b)
}

.task-bg {
  @apply pin absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>
