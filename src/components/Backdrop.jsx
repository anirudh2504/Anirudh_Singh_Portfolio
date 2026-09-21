// Fixed wallpaper + drifting colour blobs; which of them show is decided by the style tokens.
export default function Backdrop() {
  return (
    <div className="bg" aria-hidden="true">
      <span className="b1" /><span className="b2" /><span className="b3" />
    </div>
  )
}
