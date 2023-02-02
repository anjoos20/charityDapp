import React from 'react'

const addcause = () => {

    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()
    
        // Get data from the form.
        const data = {
          first: event.target.first.value,
          last: event.target.last.value,
        }
    }
  return (
<div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
<h4 className='cause1'>Add new requirement for fund</h4>
<form onSubmit={handleSubmit}>
  <div className="row mb-4">
    <div className="col">
      <div className="form-outline">
        <input type="text" id="purpose" name="purpose" required minlength="10" maxlength="30" className="form-control" />
        <label className="form-label" >Purpose of Fund</label>
      </div>
    </div>
  </div>

  <div className="form-outline mb-4">
  <input type="text" id="Address" name="Address" required minlength="42" maxlength="42" className="form-control" />
    <label className="form-label" >Address</label>
  </div>

  <div className="form-outline mb-4">
  <input type="text" id="Amount" name="Amount" required className="form-control" />
    <label className="form-label">Required amount</label>
  </div>

  <div className="form-outline mb-4">
    <input type="text" id="form6Example4" className="form-control" />
    <label className="form-label">Target date</label>
  </div>

  <button type="submit" className="btn btn-primary btn-block mb-4">Submit</button>
</form>
</div>
  )
}

export default addcause