<template>
  <div class="delete-view" v-on="$listeners">
    <div class="flex flex-col flex-grow items-start justify-between px-4 items-center">
      <h2 class="p-4">Are you sure you want to delete this?</h2>
      <div class="flex flex-row">
        <div class="p-4">
          <AppButton type="danger" @click.stop="deleteTaskOrColumn()"
            >Delete</AppButton
          >
        </div>
        <div class="p-4">
          <AppButton @click="close" class="p-4">Cancel</AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    deleteTaskOrColumn () {
      const type = this.$route.params.type
      if (type === 'task') {
        this.deleteTask(
          this.$route.params.columnIndex,
          this.$route.params.taskIndex
        )
      } else {
        this.deleteColumn(this.$route.params.columnIndex)
      }
    },
    deleteTask (columnIndex, taskIndex) {
      this.$store.commit('DELETE_TASK', { columnIndex, taskIndex })
      this.close()
    },
    deleteColumn (columnIndex) {
      this.$store.commit('DELETE_COLUMN', { columnIndex })
      this.close()
    },
    close () {
      this.$router.push({ name: 'board' })
    }
  }
}
</script>

<style>
.delete-view {
  @apply relative flex flex-row bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>
