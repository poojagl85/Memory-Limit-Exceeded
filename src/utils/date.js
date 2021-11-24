const getLongDate = (d) => {
      const date = new Date(d)
      const arr = date.toString().split(" ");
      return `${arr[1]} ${arr[2]}, ${arr[3]}`
}

export default getLongDate;